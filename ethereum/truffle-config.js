const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    from: "0xC7a01f841b06E2B14B2CF79868824a2E002bc378",
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
        arbitrum: {
            provider: () =>
                new HDWalletProvider("a62a05de6cd346c85cbdf5281532c38fff972558fd02e2cc1d447e435de10f18", "https://arb-rinkeby.g.alchemy.com/v2/s7xv-AAMJIXmkG9IThod1QRbuHMsSB1h"),
            network_id: 421611,
            gas: 150000000
        },
        rinkeby: {
            provider: () =>
                new HDWalletProvider("a62a05de6cd346c85cbdf5281532c38fff972558fd02e2cc1d447e435de10f18", "https://eth-rinkeby.alchemyapi.io/v2/neE4MMVQXK_r0VJ7yqRD5ZMLxX5ISp2F"),
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000,
        }
    },
    compilers: {
        solc: {
            version: "^0.8.0"
        }
    }
};
