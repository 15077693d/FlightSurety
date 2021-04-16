
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x32ece2E6b3e76d7C0631250509c4e593a4Bf1EdC",
        "0x5005C75B32B5B1e0dD325bBde4a2260d66c2b574",
        "0xACB2E983c6892d0f1A35959a70c33b9f066F4B1A",
        "0x44aCF0c5Fdab636E8b6Bb764bCC0eE7859352D8e",
        "0x5cbd1b0BE75CB9e3D3a03a8E39CD3E98eB594150",
        "0xbf04002A7FdfA580B2aa452724B901ac572b2E53",
        "0xcfe83B502f9b1BD72FBE4C04AF660A4A6c72b0d3",
        "0x196eC063FB2a7BdF2b90eaB54CFbbD169d39Dab4",
        "0xd3d8458e7C5aac8aE0b50201cce4B2C3539FE292",
        "0x003c5DCEb051a46765eD7376a823fCB34d777b1D",
    ];

    let owner = accounts[0];
    let firstAirline = accounts[0];
    let flightSuretyData = await FlightSuretyData.new();
    let flightSuretyApp = await FlightSuretyApp.new(flightSuretyData.address, owner);
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