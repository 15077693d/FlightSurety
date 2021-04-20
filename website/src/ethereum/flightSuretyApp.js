import { getAccount, FlightSuretyApp, web3 } from './web3'

// supplyChain.methods.OrderAmount().call()
// supplyChain.methods.purchaseMedicine(amount, new Date().getTime(),location).send({from:await getAccount()})
const registerAirline = async (newAirline) => {
    await FlightSuretyApp.methods.registerAirline(newAirline).send(
        { from: await getAccount() }
    )
}

const getFlight = async () => {
    const status = {
                "0":"UNKNOWN",
        "10":"ON_TIME",
        "20":"LATE_AIRLINE",
        "30":"LATE_WEATHER",
        "40":"LATE_TECHNICAL",
        "50":"LATE_OTHER",
    }
    const count = await FlightSuretyApp.methods.flightCount().call()
    const namePromises = []
    for (let i=0;i<Number(count);i++){
        namePromises.push(FlightSuretyApp.methods.flightNames(i).call())
    }
    const names = await Promise.all(namePromises)
    const flightPromises = []
    for (let i=0;i<names.length;i++){
        flightPromises.push(FlightSuretyApp.methods.getFlight(names[i]).call())
    }
    const _flights = await Promise.all(flightPromises)
    let flights = []
    for (let i=0; i<_flights.length;i++){
        flights.push({
            isRegistered:_flights[i][0],
            name: names[i],
            statusCode:_flights[i][0]==false?"CANCELLED":status[_flights[i][1]],
            updatedTimestamp:_flights[i][2],
            airline:_flights[i][3]
        })
    }
    console.log(flights)
    return flights
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

const removeFlight = async (flight) => {
    await FlightSuretyApp.methods.removeFlight(flight).send(
        {
            from: await getAccount(),
        }
    )
}
export { registerAirline, fundAirline ,getFlight, addFlight, removeFlight}