require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    "ropsten-infura": {
      provider: () => new HDWalletProvider("976b9d6972ea4ba3ba311f823564ed50", "https://ropsten.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b"),
      network_id: 3,
      gas: 4700000
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
