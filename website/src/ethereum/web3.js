import Web3 from 'web3'
import FlightSuretyAppJson from './contracts/FlightSuretyApp.json'
import FlightSuretyDataJson from './contracts/FlightSuretyData.json'
let web3;

let flightSuretyAppAddress = "0x3F262b0b331D797587193f22FEDD240A2E6913Ec"
let flightSuretyDataAddress = "0x587c0D9596aBaE2303Cb7570B1dEAdc40D307fE1"

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // We are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider, null, null);
} else {
    // We are on the Server OR the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        "http://localhost:7545/"
    );
    web3 = new Web3(provider, null, null);
}

const FlightSuretyApp = new web3.eth.Contract(FlightSuretyAppJson.abi, flightSuretyAppAddress)
const FlightSuretyData = new web3.eth.Contract(FlightSuretyDataJson.abi, flightSuretyDataAddress)
const getAccount = async () => {
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
}

export { web3, FlightSuretyApp, FlightSuretyData, getAccount }

