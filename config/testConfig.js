
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0xdA33778fCcEA2a83F21265a70449E91a2D5ad77d",
        "0x2E45A9944F25cf03211CEAf1a1DAf56eC31c6A57",
        "0x106DBEdA63Dc747dd20EFC7C34324335Cd28264E",
        "0x34dECbd172a57C7d332532CCaF4092D38Fc6B478",
        "0xe470ba23E15FC9D47Eeb57CD985749A8493ABFC4",
        "0xeb300F03Ae1384cDECc2a69534e8C2C2AfED2DdB",
        "0x0F0e5b4481d542E49F25d504C40F506a0712c0e7",
        "0x50FB98B79A6dB045F3BA29af99F622Cd9A800DF1",
        "0x2F3D262f8e6C0d477AdD808C74eBEa13e71154eF",
        "0x81aa321dE214D8A39777be165A02a05d6C596979",
        "0x78Ba3944E37347F417A0D45E120b8833D4FC3DA9",
        "0x9b3851E8aF7EbAb75396dEb8479074D5230C7183",
        "0x00499Ce74D224e3298c63da248ddDb9b44718591",
        "0x2C97822044635103D4A8dc6dAa176b27B4cf8d7B",
        "0x3003902C6A6079837759296F5Ea9A0090Fbb5E1a",
        "0xBbeA5ba3a13F63A2232aD9Ffc40128C1F18F0376",
        "0x9fbFee6090bd743E05171aEa65D12e61c85e7aca",
        "0xF7029C55bB17EF13a9ecf5483115C6E584Dea3ce",
        "0xE5FaBC1305a6Bfa9bd78AcF32f485e9FB1972959",
        "0x7f2813C3b451ceB8123a258ae63813892fCDeFDD",
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