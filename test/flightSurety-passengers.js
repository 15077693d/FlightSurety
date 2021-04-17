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
          await config.flightSuretyData.buy("abc1234",{from:config.testAddresses[2],value:20000000000000000000})  
        }catch(error){
            flag = false
        }
        assert.equal(flag,false,"Passengers should not pay more than 1 ether")
    })

    it("Passengers may pay up to 1 ether for purchasing flight insurance. 2", async () => {
        let flag = true
        try{
          await config.flightSuretyData.buy("abc1234",{from:config.testAddresses[4],value:1000000000})  
        }catch(error){
            console.log(error)
            flag = false
        }
        assert.equal(await web3.eth.getBalance( config.flightSuretyData.address),1000000000,"Passengers cannot pay 1 ether")
    })

    it("If flight is delayed due to airline fault, passenger receives credit of 1.5X the amount they paid", async () => {
        
    })
})