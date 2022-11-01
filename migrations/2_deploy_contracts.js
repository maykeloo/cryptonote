const Cryptonote = artifacts.require("Cryptonote");

module.exports = function(deployer) {
  deployer.deploy(Cryptonote);
};
