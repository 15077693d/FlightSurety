import { getAccount, FlightSuretyData, FlightSuretyApp, web3 } from './web3'
// supplyChain.methods.OrderAmount().call()
// supplyChain.methods.purchaseMedicine(amount, new Date().getTime(),location).send({from:await getAccount()})
const getOperationStatus = async () => {
    const contractOwner = await FlightSuretyData.methods.getContractOwner().call()   
    const operational = await FlightSuretyData.methods.isOperational().call()   
    return {
        contractOwner,
        operational
    }
}

const getClient = async () => {
    const account =await getAccount()
    const count = await FlightSuretyData.methods.clientPurchaseCount(account).call()
    let flightNamesPromises = []
    let flightAmountsPromises = []
    for(let i =0; i< Number(count);i++){
        flightNamesPromises.push(FlightSuretyData.methods.clientPurchases(account, i).call())
        flightAmountsPromises.push(FlightSuretyData.methods.clientPayments(account, i).call())
    }
    const flightNames =  await Promise.all(flightNamesPromises)
    const flightAmounts =  await Promise.all(flightAmountsPromises)
    let purchases = []
    for(let j = 0; j < flightNames.length; j++){
        purchases.push({
            flightName: flightNames[j],
            flightAmount: web3.utils.fromWei(flightAmounts[j], 'ether')
        })
    }
    const withdraw = web3.utils.fromWei(await FlightSuretyData.methods.clientWithdraw(account).call(),'ether')
    return {withdraw,purchases}
}

const setOperationStatus = async (mode) => {
    await FlightSuretyData.methods.setOperatingStatus(mode==="true"?true:false).send(
        {
            from:await getAccount()
        }
    )   
}

const getAirlines = async () => {
    const count = await FlightSuretyData.methods.airlineCount().call()
    const addressPromises = []
    const etherPromises = []
    for (let i = 0; i < count; i++) {
        addressPromises.push(FlightSuretyData.methods.airlineList(i).call())
    }
    const addresses =  await Promise.all(addressPromises)
    for (let i = 0; i < count; i++) {
        etherPromises.push(FlightSuretyApp.methods.registratedAirlinesEther(addresses[i]).call())
    }
    const ethers = await Promise.all(etherPromises)
    const airlines = []
    for(let i=0;i<addresses.length;i++){
        airlines.push(
            {
                address:addresses[i],
                ether:web3.utils.fromWei(ethers[i], 'ether')
            }
        ) 
    }
    return airlines
}

const withdraw = async () => {
    const account =await getAccount()
    await FlightSuretyData.methods.withdraw(account).send( {
        from: account
    })
}
export {withdraw, getAirlines, getClient, getOperationStatus, setOperationStatus }