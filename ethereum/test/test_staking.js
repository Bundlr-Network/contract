const PolymerBundlerStaking = artifacts.require("PolymerBundlerStaking");

contract("Test staking", _ => {
    it('should work', async function () {
        await PolymerBundlerStaking.deployed()
            .then(async (instance) => {
                console.log(await instance.getBundlers());
                return await instance.getBundlers();
            })
            .then(bundlers => {
                assert.equal(
                    bundlers.length,
                    [].length,
                    "Fuck"
                )
            })
    });
});
