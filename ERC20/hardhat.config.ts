require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
const { DEFAULT_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env
module.exports = {
  solidity: "0.8.24",
  networks: {
    "arbitrum-sepolia": {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: [`${DEFAULT_PRIVATE_KEY}`],
      chainId: 421614
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY ?? "",
    customChains: [
      {
        network: "arbitrum-sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
    ],
  }
};