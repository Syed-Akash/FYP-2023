require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("dotenv").config();

// const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// @type import('hardhat/config').HardhatUserConfig
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    sepolia: {
      chainId: 11155111,
      blockConfirmations: 6,
      url: `https://eth-sepolia.g.alchemy.com/v2/B773MyFlPcWYKH-DPaf6RfCWUaho3sNK`,
      accounts: [
        `e9942a01b163cca688198ba0dda0fcd343a601601eaf4152acfaaee8f7707c19`,
      ],
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    // },
    // etherscan: {
    // 	apiKey: ETHERSCAN_API_KEY,
    // },
    // namedAccounts: {
    // 	deployer: {
    // 		default: 0,
    // 	},
  },
};
