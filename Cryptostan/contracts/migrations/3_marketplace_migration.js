const CryptostanMarketContract = artifacts.require("CryptostanMarketContract");

module.exports = function (deployer) {
  deployer.deploy(CryptostanMarketContract);
};
