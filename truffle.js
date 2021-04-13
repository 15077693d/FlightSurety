var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "doll oyster will soccer civil write labor anxiety surface rally inner situate"

module.exports = {
  networks: {
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/", 0, 50);
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