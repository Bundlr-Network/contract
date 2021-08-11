const Polymer = artifacts.require("Polymer");
const PolymerBundlerStaking = artifacts.require("PolymerBundlerStaking");

module.exports = async function (deployer) {
    await deployer.deploy(Polymer, 100000000);
    await deployer.deploy(PolymerBundlerStaking, Polymer.address, 25000, 5);
};
