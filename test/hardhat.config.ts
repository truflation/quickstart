import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'
import 'hardhat-gas-reporter'
import '@typechain/hardhat'
require("@nomiclabs/hardhat-web3");
import * as dotenv from 'dotenv'
dotenv.config()

const INFURA_API_KEY = process.env.INFURA_API_KEY ?? ''
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY ?? ''
const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY ?? ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ?? ''
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY ?? ''
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY ?? ''
const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY ?? ''
const FTMSCAN_API_KEY = process.env.FTMSCAN_API_KEY ?? ''
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY ?? ''
const ARBITRUM_API_KEY = process.env.ARBITRUM_API_KEY ?? ''
const ARBITRUM_ONE_URL = process.env.ARBITRUM_ONE_URL ?? ''
const ARBITRUM_TESTNET_URL = process.env.ARBITRUM_TESTNET_URL ?? ''

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.7.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: '0.8.19'
      },
      {
        version: '0.4.26',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  networks: {
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [MAINNET_PRIVATE_KEY]
    },
    bsc: {
      chainId: 56,
      url: 'https://bsc-dataseed.binance.org/',
      accounts: [MAINNET_PRIVATE_KEY]
    },
    polygon: {
      chainId: 137,
      url: 'https://polygon-rpc.com',
      accounts: [MAINNET_PRIVATE_KEY]
    },
    avalanche: {
      chainId: 43114,
      url: 'https://api.avax.network/ext/bc/C/rpc',
      accounts: [MAINNET_PRIVATE_KEY]
    },
    opera: {
      chainId: 250,
      url: 'https://rpc.ankr.com/fantom/',
      accounts: [MAINNET_PRIVATE_KEY]
    },
    arbitrumOne: {
      chainId: 42161,
      url: ARBITRUM_ONE_URL,
      accounts: [MAINNET_PRIVATE_KEY]
    },
    goerli: {
      chainId: 5,
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [TESTNET_PRIVATE_KEY]
    },
    bscTestnet: {
      chainId: 97,
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [TESTNET_PRIVATE_KEY]
    },
    polygonMumbai: {
      chainId: 80001,
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: [TESTNET_PRIVATE_KEY]
    },
    avalancheFujiTestnet: {
      chainId: 43113,
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts: [TESTNET_PRIVATE_KEY]
    },
    ftmTestnet: {
      chainId: 4002,
      url: 'https://rpc.testnet.fantom.network/',
      accounts: [TESTNET_PRIVATE_KEY]
    },
    arbitrumTestnet: {
      chainId: 421613,
      url: ARBITRUM_TESTNET_URL,
      accounts: [TESTNET_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      bsc: BSCSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
      avalanche: SNOWTRACE_API_KEY,
      opera: FTMSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
      avalancheFujiTestnet: SNOWTRACE_API_KEY,
      ftmTestnet: FTMSCAN_API_KEY,
      arbitrumTestnet: ARBITRUM_API_KEY,
      arbitrumOne: ARBITRUM_API_KEY
    },
    customChains: [
      {
	network: 'arbitrumTestnet',
	chainId: 421613,
	urls: {
          apiURL: 'https://api-goerli.arbiscan.io/api',
          browserURL: 'https://goerli.arbiscan.io/'
	}
      }
    ]
  },
  gasReporter: {
    enabled: true,
    gasPriceApi: ETHERSCAN_API_KEY,
    coinmarketcap: COINMARKETCAP_API_KEY
  }
}

export default config
