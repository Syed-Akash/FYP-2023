// const { network, ethers, getNamedAccounts, deployments } = require("hardhat");
// const { developmentChains } = require("./helper-hardhat-config");
// const { verify } = require("./utils/verify.js");
// require("dotenv").config();

// async function createWarrantyCardNFT() {
//   const { deploy, log } = deployments;
//   const { deployer } = await getNamedAccounts();

//   let warrantyCardName, warrantyCardSymbol;

//   if (developmentChains.includes(network.name)) {
//     const erc721Mock = await ethers.getContract("ERC721Mock");
//     warrantyCardName = erc721Mock.name();
//     warrantyCardSymbol = erc721Mock.symbol();
//   } else {
//     warrantyCardName = "Tempro";
//     warrantyCardSymbol = "RET";
//   }

//   const args = [warrantyCardName, warrantyCardSymbol];

//   const warrantyCardNFT = await deploy("WarrantyCard", {
//     from: deployer,
//     args,
//     log: true,
//     waitConfirmations: network.config.blockConfirmations || 1,
//   });
//   console.log("WarrantyCard NFT deployed at:", warrantyCardNFT.address);
//   if (
//     !developmentChains.includes(network.name) &&
//     process.env.ETHERSCAN_API_KEY
//   ) {
//     log("Verifying....");
//     await verify(warrantyCardNFT.address, args);
//   }
// }

// module.exports = createWarrantyCardNFT;

// module.exports.tags = ["all", "warrantyCardNFT"];

const { ethers } = require("hardhat");
const { developmentChains } = require("./helper-hardhat-config");
require("dotenv").config();

async function deployWarrantyCardNFT() {
  const signers = await ethers.getSigners();
  const deployer = signers[0];

  let warrantyCardName, warrantyCardSymbol;

  if (developmentChains.includes(network.name)) {
    const erc721Mock = await ethers.getContract("ERC721Mock");
    warrantyCardName = await erc721Mock.name();
    warrantyCardSymbol = await erc721Mock.symbol();
  } else {
    warrantyCardName = "Tempro";
    warrantyCardSymbol = "RET";
  }

  const args = [warrantyCardName, warrantyCardSymbol];

  const WarrantyCardNFT = await ethers.getContractFactory("WarrantyCard");
  const warrantyCardNFT = await WarrantyCardNFT.deploy(...args);
  await warrantyCardNFT.deployed();

  console.log("WarrantyCardNFT deployed to:", warrantyCardNFT.address);
}

async function main() {
  await deployWarrantyCardNFT();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
