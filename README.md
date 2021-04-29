# FlightSurety

FlightSurety is a sample application project for Udacity's Blockchain course.

## Website

### Airline board
![alt text](https://github.com/15077693d/FlightSurety/blob/master/readme-image/flightsurety1.png?raw=true)

### Client board
![alt text](https://github.com/15077693d/FlightSurety/blob/master/readme-image/flightsurety2.png?raw=true)

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

To install, download or clone the repo, then:

`npm install`
`truffle compile`
`cd ./website npm install`

## Develop Client

To run truffle tests:

`truffle test ./test/flightSurety-airlines.js`
`truffle test ./test/flightSurety-passengers`
`truffle test ./test/oracles.js`

To use the dapp:

`truffle migrate --reset`
`change addresses on ~/website/src/ethereum/web3.js`
`cd ./website`
`npm run start`

To view dapp:

`http://localhost:8000`

## Develop Server

Deploy the contents of the ./dapp folder

`cd .\server`
`change address on ~/server/ethereum/web3.js`
`node --experimental-json-modules --experimental-modules app.js`

## Resources

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)
