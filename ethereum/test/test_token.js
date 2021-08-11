const Polymer = artifacts.require("Polymer");

contract("Test token", _ => {
    it('should work', async function () {
        await Polymer.deployed()
            .then(async (instance) => await instance.name())
            .then(name => {
                assert.equal(
                    name,
                    "Polymer",
                    "Fuck"
                )
            })
    });
});
