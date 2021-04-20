import { getAccount, FlightSuretyApp, web3 } from './web3'

// supplyChain.methods.OrderAmount().call()
// supplyChain.methods.purchaseMedicine(amount, new Date().getTime(),location).send({from:await getAccount()})
const registerAirline = async (newAirline) => {
    await FlightSuretyApp.methods.registerAirline(newAirline).send(
        { from: await getAccount() }
    )
}

const getFlight = async () => {
    const count = await FlightSuretyApp.methods.flightCount().call()
    console.log(count)
    const namePromises = []
    for (let i=0;i<Number(count);i++){
        namePromises.push(FlightSuretyApp.methods.getFlight(i).call())
    }
    const names = await Promise.all(namePromises)
    const flightPromises = []
    for (let i=0;i<names.length;i++){
        flightPromises.push(FlightSuretyApp.methods.getFlight(names[i]).call())
    }
    const flights = await Promise.all(flightPromises)
    console.log(flights)
}

const addFlight = async (flightName, timestamp) => {
    await FlightSuretyApp.methods.registerFlight(timestamp, flightName).send({
        from:await getAccount()
    })
}

const fundAirline = async (ether) => {
    await FlightSuretyApp.methods.addEther().send(
        {
            from: await getAccount(),
            value: web3.utils.toWei(ether, 'ether')
        }
    )
}
export { registerAirline, fundAirline ,getFlight, addFlight}