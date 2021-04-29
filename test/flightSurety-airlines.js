
var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('Flight Surety Tests(airlines)', async (accounts) => {

    var config;
    before('setup contract', async () => {
        config = await Test.Config(accounts);
        // await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
    });

    /****************************************************************************************/
    /* Operations and Settings                                                              */
    /****************************************************************************************/

    it(`(multiparty) has correct initial isOpeNumberrational() value`, async function () {

        // Get operating status
        let status = await config.flightSuretyData.isOperational.call();
        assert.equal(status, true, "Incorrect initial operating status value");

    });

    it(`(multiparty) can block access to setOperatingStatus() for non-Contract Owner account`, async function () {

        // Ensure that access is denied for non-Contract Owner account
        let accessDenied = false;
        try {
            await config.flightSuretyData.setOperatingStatus(false, { from: config.testAddresses[2] });
        }
        catch (e) {
            accessDenied = true;
        }
        assert.equal(accessDenied, true, "Access not restricted to Contract Owner");

    });

    it(`(multiparty) can allow access to setOperatingStatus() for Contract Owner account`, async function () {

        // Ensure that access is allowed for Contract Owner account
        let accessDenied = false;
        try {
            await config.flightSuretyData.setOperatingStatus(false);
        }
        catch (e) {
            accessDenied = true;
        }
        assert.equal(accessDenied, false, "Access not restricted to Contract Owner");

    });

    it(`(multiparty) can block access to functions using requireIsOperational when operating status is false`, async function () {

        await config.flightSuretyData.setOperatingStatus(false);

        let reverted = false;
        try {
            await config.flightSurety.setTestingMode(true);
        }
        catch (e) {
            reverted = true;
        }
        assert.equal(reverted, true, "Access not blocked for requireIsOperational");

        // Set it back for other tests to work
        await config.flightSuretyData.setOperatingStatus(true);

    });

    it('First airline is registered when contract is deployed.', async () => {
        // ARRANGE
        let actual = await config.flightSuretyData.isAirline.call(config.firstAirline)
        let expect = true
        // ASSERT
        assert.equal(actual, expect, "First Airline should not be able to register");

    })

    it('Only existing airline may register a new airline until there are at least four airlines registered', async () => {

        // ARRANGE
        let newAirline = accounts[1];

        // ACT
        try {
            await config.flightSuretyApp.registerAirline(newAirline, { from: config.firstAirline });
        }
        catch (e) {
            console.log(e)
        }

        let result = await config.flightSuretyData.isAirline.call(newAirline);

        // ASSERT
        assert.equal(result, true, "Airline should register a new airline until there are at least four airlines registered ");

    });

    it("Registration of fifth and subsequent airlines requires multi-party consensus of 50% of registered airlines 1", async () => {
        // ARRANGE
        let newAirline3 = accounts[2];
        let newAirline4 = accounts[3];
        let newAirline5 = accounts[4];

        // ACT
        try {
            await config.flightSuretyApp.registerAirline(newAirline3, { from: config.firstAirline });
            await config.flightSuretyApp.registerAirline(newAirline4, { from: config.firstAirline });
            await config.flightSuretyApp.registerAirline(newAirline5, { from: config.firstAirline });

        }
        catch (e) {
            console.log(e)
        }

        let result1 = await config.flightSuretyData.isAirline.call(newAirline5);

        // ASSERT
        assert.equal(result1, false, "Airline requires multi-party consensus of 50% ");
    })

    it("Registration of fifth and subsequent airlines requires multi-party consensus of 50% of registered airlines 2", async () => {
        // ARRANGE
        let newAirline = accounts[5];

         // ACT
         try {
            await config.flightSuretyApp.registerAirline(newAirline, { from: config.testAddresses[0]});
            await config.flightSuretyApp.registerAirline(newAirline, { from: config.testAddresses[1]});
            await config.flightSuretyApp.registerAirline(newAirline, { from: config.testAddresses[3] });
        }
        catch (e) {
            console.log(e)
        }

        let result2 = await config.flightSuretyData.isAirline.call(newAirline);

        // ASSERT
        assert.equal(result2, true, "Airline can be reg by multi-party consensus of 50% ");
    })

    it("Airline can be registered, but does not participate in contract until it submits funding of 10 ether 1", async () => {
        let airline = accounts[0]
        let result = false
        try {
            await config.flightSuretyApp.registerFlight(12345, "abc123",{from:accounts[0]})
        } catch (error) {
            // console.log(error)
            result = true
        }
        assert.equal(result, true, "Airline should not ex function after add 10 ether ");
    })

    it("Airline can be registered, but does not participate in contract until it submits funding of 10 ether 2", async () => {
        let airline = accounts[1]
        let result = false
        try {
            await config.flightSuretyApp.addEther({from:accounts[1], value:10000000000000000000})
            await config.flightSuretyApp.registerFlight(12345, "abc123",{from:accounts[1]})
            result = true
        } catch (error) {
            console.log("2!!!!!")
            console.log(error)
        }
        assert.equal(result, true, "Airline should ex function after add 10 ether ");
    })
    
});
