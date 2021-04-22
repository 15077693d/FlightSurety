var Test = require('../config/testConfig.js');
contract('Flight Surety Tests(passengers)', async (accounts) => {

    var config;
    before('setup contract', async () => {
        config = await Test.Config(accounts);
        // await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
    });

    it("Passengers may pay up to 1 ether for purchasing flight insurance. 1", async () => {
        let flag = true
        try{
          await config.flightSuretyData.buy("abc1234",config.testAddresses[2],{from:config.testAddresses[2],value:20000000000000000000})  
        }catch(error){
            flag = false
        }
        assert.equal(flag,false,"Passengers should not pay more than 1 ether")
    })

    it("Passengers may pay up to 1 ether for purchasing flight insurance. 2", async () => {
        let flag = true
        try{
          console.log(await web3.eth.getBalance( config.flightSuretyData.address))
          await config.flightSuretyData.buy("abc1234",config.testAddresses[4],{from:config.testAddresses[4],value:100000000})  
        }catch(error){
            console.log(error)
            flag = false
        }
        assert.equal(await web3.eth.getBalance( config.flightSuretyData.address),100000000,"Passengers cannot pay 1 ether")
    })

    it("If flight is delayed due to airline fault, passenger receives credit of 1.5X the amount they paid", async () => {
        await config.flightSuretyData.pay("abc1234")
        let actual = await config.flightSuretyData.clientWithdraw.call(config.testAddresses[4]) 
        console.log(actual.toString())
        assert.equal(actual,100000000*1.5,"Passenger should receives credit of 1.5X")
    })

    it("Passenger can withdraw any funds owed to them as a result of receiving credit for insurance payout", async () => {
        await config.flightSuretyData.fund({from: accounts[0], value:50000000})
        let first = await web3.eth.getBalance( config.testAddresses[4])
        let actual2 = await config.flightSuretyData.clientWithdraw.call(config.testAddresses[4]) 
        console.log(actual2.toString(), await web3.eth.getBalance( await config.flightSuretyData.address))
        await config.flightSuretyData.withdraw(config.testAddresses[4],{from: config.testAddresses[4]}) 
        let last = await web3.eth.getBalance( config.testAddresses[4])
        console.log(first)
        console.log(last)
        // let actual = last.toNumber() - first.toNumber()
        //assert.equal(actual,100000000*1.5)
    })

    it("flight register and cancel and repay passenger and withdraw...", async () => {
        let airline = accounts[0]
        // add fund
        console.log(await web3.utils.toWei("10","ether"),"oscar!!!")
        await config.flightSuretyApp.addEther({
            from:airline,
            value:await web3.utils.toWei("10","ether")
        }) 
        // reg flight
        await config.flightSuretyApp.registerFlight(1,"123")
        // buy insurance
        await config.flightSuretyApp.buyInsurance("123",{
            from:airline,
            value:await web3.utils.toWei("1","ether")
        })
        console.log(await web3.utils.fromWei(await web3.eth.getBalance( airline),"ether"))
        // remove flight
        await config.flightSuretyApp.removeFlight("123")
        // repay client
        await config.flightSuretyApp.payClient("123")
        // client withdraw
        await config.flightSuretyData.withdraw(airline)
        console.log(await web3.utils.fromWei(await web3.eth.getBalance( airline),"ether"))
    })
})