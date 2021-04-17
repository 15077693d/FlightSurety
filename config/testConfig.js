
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
    "0x504e06733c3EBEAd15707BCE61583D91CA5c1E71",
    "0xdCd91a94eb71F4157f135E56A6799EFBf9d93B73",
    "0xE1dA35A21434E196A0E2fD77D06d90f8c274E499",
    "0xB366AA7DD96893ecFd16516Ab01963ffB331A46E",
    "0xE46294649101900f8785F0F353c7E2be79545F02",
    "0xab43d6302cd77D1F940Bf5d599839a94468334b7",
    "0x6cd7f025aF4aC0584C59317acD7296BD272317cF",
    "0x4801193C08B51109f78a0AE1B442e8d1D03642dc",
    "0xEa6a50FeDeB8D333F87c4EE36038531a1AdF41BE",
    "0x18e492c948285D2FBc2e01c73dCA76B80c5fEF74",
        "0x56aBd7a8dbD69132160859150bB622a3B76C94BA",
        "0x90136968C18Ee2c1d551DcFe497f5c4C83a0A9ef",
        "0x8701C8e1E6eB85b7f346F79979D3340362aB679a",
        "0x24eb6840b29b516de9f42a8c895f9795DF0c2134",
        "0x9A0Ab6959b616e7E3b7c80eAc5859C307829494c",
        "0xfe92Ce6eE79210bac688D0033162855360651D81",
        "0xe8148162D56Bc0B791c0E2c49d68777218aD81d3",
        "0xf647452A240771434EFDa113C550caB7e00F0B47",
        "0xa1A2f1EFc5F76eF2B005403aDf2e98420f4d635B",
        "0x74a1AeB075868b41904AB20DF5439F0eb0837f63",
        "0x50E45C602f962656A8b1E977Af0E948a6173fb19",
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