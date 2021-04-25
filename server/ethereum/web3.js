import Web3 from 'web3'
import FlightSuretyAppJson from './contracts/FlightSuretyApp.json'
let web3;

let flightSuretyAppAddress = "0x3F262b0b331D797587193f22FEDD240A2E6913Ec"
const provider = new Web3.providers.HttpProvider(
    "http://localhost:7545/"
);
web3 = new Web3(provider, null, null);

const FlightSuretyApp = new web3.eth.Contract(FlightSuretyAppJson.abi, flightSuretyAppAddress)
const REGISTRATION_FEE = 1;
const registerOracle = async (address) => {
    await FlightSuretyApp.registerOracle().send(
        {
            from: address,
            value: web3.utils.toWei(ether, 'ether')
        }
    )
}

const getMyIndexes = async () => {
    await FlightSuretyApp.getMyIndexes().send(
        {
            from: address
        }
    )
}

const submitOracleResponse = async (index,
    airline,
    flight,
    timestamp,
    statusCode) => {
    await FlightSuretyApp.submitOracleResponse(
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
export { web3, FlightSuretyApp }

