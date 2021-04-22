var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "waste seat civil garage rate scout scrub will reason frequent plastic flag"
// ganache-cli -a 50 -m "waste seat civil garage rate scout scrub will reason frequent plastic flag" -p 7545 -e 1000000

module.exports = {
  networks: {
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/", 0, 50);
      },
      network_id: '*',
    }
  },
  compilers: {
    solc: {
      version: "^0.4.24"
    }
  }
};