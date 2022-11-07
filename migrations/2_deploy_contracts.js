const Cryptonote = artifacts.require("Cryptonote");
const MSCB = artifacts.require("MSCB")
const MSCBSaleToken= artifacts.require("MSCBSaleToken")

module.exports = async function(deployer) {
  await deployer.deploy(Cryptonote);
  await deployer.deploy(MSCB);
  const token =  await MSCB.deployed()
  await deployer.deploy(MSCBSaleToken, token.address);
};
