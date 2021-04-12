
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x365E64803ee8CbAdE3842f519b6619b0b93E60AE",
        "0x9BEB61e7e190e089c457f7390295568858222d8a",
        "0xF13aeef3a941F2eb63599d79474229451C4e187A",
        "0x2417A38E0DaB30b3fEa0a91f0E921b219B8621b6",
        "0x2baF3b317a9B890072e34e311e49Da90546Af00E",
        "0x99B6C5324f09cFbEc6870B1A47F99889f78D7AD1",
        "0x101d9087915F9Ea6FAb290873bccE1488B236441",
        "0x7437D336270da212DEeD7364332c3f01ea8a51Ca",
        "0x196A4fBEa038c3D768A5B2CE6e3801CB2d663A62",
        "0x4388bCf46c62812E57B3e7771E80D834CedbD197",
    ];


    let owner = accounts[0];
    let firstAirline = accounts[1];

    let flightSuretyData = await FlightSuretyData.new();
    let flightSuretyApp = await FlightSuretyApp.new(flightSuretyData.address);

    
    return {
        owner: owner,
        firstAirline: firstAirline,
        weiMultiple: (new BigNumber(10)).pow(18),
        testAddresses: testAddresses,
        flightSuretyData: flightSuretyData,
        flightSuretyApp: flightSuretyApp
    }
}

module.exports = {
    Config: Config
};