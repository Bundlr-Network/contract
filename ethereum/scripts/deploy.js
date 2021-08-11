const ethers = require("@nomiclabs/hardhat-ethers");

async function main() {
    // We get the contract to deploy
    const Polymer = await ethers.getContractFactory("Polymer");
    const greeter = await Polymer.deploy("Hello, Hardhat!");

    console.log("Greeter deployed to:", greeter.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
