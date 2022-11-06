const Cryptonote = artifacts.require("Cryptonote");
const MSCB = artifacts.require("MSCB")

module.exports = function(deployer) {
  deployer.deploy(Cryptonote);
  deployer.deploy(MSCB);
};
