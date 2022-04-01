const CryptostanToken = artifacts.require("CryptostanToken");

module.exports = function (deployer) {
  deployer.deploy(CryptostanToken);
};
