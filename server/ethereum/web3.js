import Web3 from 'web3'
import FlightSuretyAppJson from './contracts/FlightSuretyApp.json'
let web3;

let flightSuretyAppAddress = "0x153D02110972190C6a3164bBe6dE0e309809Fa85"
const provider = new Web3.providers.HttpProvider(
    "http://localhost:7545/"
);
web3 = new Web3(provider, null, null);

const FlightSuretyApp = new web3.eth.Contract(FlightSuretyAppJson.abi, flightSuretyAppAddress)
const REGISTRATION_FEE = "1";
const registerOracle = async (address) => {
    await FlightSuretyApp.methods.registerOracle().send(
        {
            from: address,
            value: web3.utils.toWei(REGISTRATION_FEE, 'ether'),
            gas: 3000000
        }
    )
}

const getMyIndexes = async (address) => {
    return await FlightSuretyApp.methods.getMyIndexes().call(
        {
            from: address
        }
    )
}

const submitOracleResponse = async ({ index,
    airline,
    flight,
    timestamp,
    statusCode,
    address }) => {
    await FlightSuretyApp.methods.submitOracleResponse(
        index,
        airline,
        flight,
        timestamp,
        statusCode
    ).send(
        {
            from: address
        }
    )
}

const registerOracles = async () => {
    const accounts = await web3.eth.getAccounts()
    for (let i = 0; i < 2; i++) {
        await registerOracle(accounts[i])
        console.log(`${accounts[i]} register oracles...`)
    }
}

const fetchFlightStatus = async ({airline,
    flight,
    timestamp,address}) => {
        console.log(airline,
            flight,
            timestamp,)
    return await FlightSuretyApp.methods.fetchFlightStatus(
        airline,
        flight,
        timestamp
    ).send(
        {
            from: address
        }
    )
}

export { fetchFlightStatus, getMyIndexes, submitOracleResponse, registerOracles }

