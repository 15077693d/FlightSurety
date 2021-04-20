import Web3 from 'web3'
import FlightSuretyAppJson from './contracts/FlightSuretyApp.json'
import FlightSuretyDataJson from './contracts/FlightSuretyData.json'
let web3;

let flightSuretyAppAddress = "0x5163EfC01dbAf1240133d5B949555bBD6901bcFf"
let flightSuretyDataAddress = "0x2296F9Eb5105517ecf8c0aE03236462e4d506f0F"

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

