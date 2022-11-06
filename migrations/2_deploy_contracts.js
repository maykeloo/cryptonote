const Cryptonote = artifacts.require("Cryptonote");
const MSCB = artifacts.require("MSCB")
const MSCBSaleToken= artifacts.require("MSCBSaleToken")

module.exports = function(deployer) {
  deployer.deploy(Cryptonote);
  deployer.deploy(MSCB);
  deployer.deploy(MSCBSaleToken);
};
