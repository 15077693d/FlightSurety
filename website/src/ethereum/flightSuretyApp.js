import { getAccount, FlightSuretyApp, web3, FlightSuretyData } from './web3'

// supplyChain.methods.OrderAmount().call()
// supplyChain.methods.purchaseMedicine(amount, new Date().getTime(),location).send({from:await getAccount()})
const registerAirline = async (newAirline) => {
    await FlightSuretyApp.methods.registerAirline(newAirline).send(
        { from: await getAccount() }
    )
}

const getClients = async (flight, amount) => {
    let addressPromises = []
    for (let i = 0; i < Number(amount); i++) {
        addressPromises.push(
            FlightSuretyData.methods.getClientByFlight(i, flight).call()
        )
    }
    let addresses = await Promise.all(addressPromises)
    let amountPromises = []
    for (let j = 0; j < addresses.length; j++) {
        amountPromises.push(
            FlightSuretyData.methods.getClientBuyAmount(flight, addresses[j]).call()
        )
    }
    let amounts = await Promise.all(amountPromises)
    let clients = []
    for (let y = 0; y < addresses.length; y++) {
        clients.push({
            address: addresses[y],
            amount: web3.utils.fromWei(amounts[y])
        })
    }
    return clients
}

const buyInsurane = async (flight, ether) => {
    console.log(flight)
    await FlightSuretyApp.methods.buyInsurance(flight).send(
        {
            from: await getAccount(),
            value: web3.utils.toWei(ether, 'ether')
        }
    )
}

const getFlight = async () => {
    const status = {
        "0": "UNKNOWN",
        "10": "ON_TIME",
        "20": "LATE_AIRLINE",
        "30": "LATE_WEATHER",
        "40": "LATE_TECHNICAL",
        "50": "LATE_OTHER",
    }
    const count = await FlightSuretyApp.methods.flightCount().call()
    const namePromises = []
    for (let i = 0; i < Number(count); i++) {
        namePromises.push(FlightSuretyApp.methods.flightNames(i).call())
    }
    const names = await Promise.all(namePromises)
    const flightPromises = []
    for (let i = 0; i < names.length; i++) {
        flightPromises.push(FlightSuretyApp.methods.getFlight(names[i]).call())
    }
    const _flights = await Promise.all(flightPromises)
    console.log(_flights)
    let flights = []
    for (let i = 0; i < _flights.length; i++) {
        flights.push({
            isRegistered: _flights[i][0],
            name: names[i],
            statusCode: _flights[i][0] === false ? "CANCELLED" : status[_flights[i][1]],
            updatedTimestamp: _flights[i][2],
            airline: _flights[i][3],
            repayment: _flights[i][4],
            clientCount: _flights[i][5],
            clients:await getClients(names[i],Number(_flights[i][5]))
        })
    }
    console.log(flights)
    return flights
}

const addFlight = async (flightName, timestamp) => {
    await FlightSuretyApp.methods.registerFlight(timestamp, flightName).send({
        from: await getAccount()
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
            from: await getAccount()
        }
    )
}

const repayClient = async (flight) => {
    await FlightSuretyApp.methods.repayClient(flight).send(
        {
            from: await getAccount()
        }
    )
}
export { buyInsurane, repayClient, registerAirline, fundAirline, getFlight, addFlight, removeFlight, getClients }