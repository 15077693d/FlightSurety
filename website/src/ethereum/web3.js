import Web3 from 'web3'
import FlightSuretyAppJson from './contracts/FlightSuretyApp.json'
import FlightSuretyDataJson from './contracts/FlightSuretyData.json'
let web3;

let flightSuretyAppAddress = "0xEBC1c844cfd895510116a5898959EEE6d1B7c213"
let flightSuretyDataAddress = "0x85794ebC3BaeE750cc1643aD3261b767F20b29bA"

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

