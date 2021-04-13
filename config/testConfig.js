
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x6d36AfFCD9841704c353BB3B5e4658B6cc2236d9",
        "0x340638d78f44e5885c36ad3cE203C7820BD11d38",
        "0x91352Ec75Aa6F60dD40861513Eee2eAeD6f15E60",
        "0xcB6648B9a480bb7642E8573c77f698161a550190",
        "0x1403B49160A6bC76430a461cE9a1a04fb6A9286C",
        "0xAD70a7b9Ee10a665e641D2b0bF04Ef9c0E85F004",
        "0x2bc13E1BaB37f38C50c82a4b5E645D86644fF095",
        "0x91464D9B0CB7AB970Efa5e145d8F95C7419bcf44",
        "0x5A857a031b3756B507dC93eE58376e4279F48b79",
        "0x3582981b6790dA73A325eC5b5D17923d2d129f92",
    ];

    let owner = accounts[0];
    let firstAirline = accounts[1];
    let flightSuretyData = await FlightSuretyData.new();
    let flightSuretyApp = await FlightSuretyApp.new();
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