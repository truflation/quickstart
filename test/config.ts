import hre from 'hardhat'

// see token addresses for the meaning of these addresses

const testnetOwner = '0x968E88df55AcAeC002e3d7c2393F9742e40d94b9'
const mainnetOwnerCorporate = '0x3035ddeA943D90c5e8F33fef59aee7c8B2D36f00'
const mainnetOwnerDeploy = '0xF530E894bc8930aCb9e86a0409098b7e1E5a27F4'
const mainnetOwner = mainnetOwnerCorporate

const mainnetJobid = 'a3fa982792ad486785be5d89ac333ab5'
const testnetJobid = 'd220e5e687884462909a03021385b7ae'

export const addressesByChain = {
  0: {
    // hardhat test node
    owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    feed_registry: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    feed_adapter: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
  },
  1: {
    owner: mainnetOwner,
    jobid: mainnetJobid,
    link: {
      token: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      operator: '0x7eDBB7EF41A6DE5F9B0E1746B345463f18642E14',
      example: '0xbf7e1FA05e9c183aDD217fE56521bb7Eb2489e41'
    }
  },
  5: {
    owner: testnetOwner,
    jobid: testnetJobid,
    link: {
      token: '0x326c977e6efc84e512bb9c30f76e30c160ed06fb',
      operator: '0x6888BdA6a975eCbACc3ba69CA2c80d7d7da5A344',
      example: '0x0edBa69e2aE5C668a46360964f8a0b402359F2E0'
    },
    tfi: {
      token: '0x3417dd955d4408638870723B9Ad8Aae81953B478',
      operator: '0x394fdd656749CCCcc21280BBDF6CC209745f4d0D',
      example: '0xF4A440F09B52dCFCe0303BD81f457761cB008Bb4'
    },
    operator_baseline: '0x7C2e0E489493e487903941F399A0255C4c170C91',
    client_baseline: '0xcb57ED564dEe9BDdF830353C8C3a09A60cBB7278',
    jobid_baseline: 'cef7d7ad405e45eb91e2da0f415c920e',
    jobid_new_pipeline: '5db955dabd334024861406858e1fbbe2',
    jobid_tfi: '2868d2f92fdc4c9abd6437eb016ab772'
  },
  56: {
    // BNB mainnet
    owner: mainnetOwner,
    jobid: mainnetJobid,
    tfi_api_poll: 1000,
    link: {
      token: '0x404460c6a5ede2d891e8297795264fde62adbb75',
      operator: '0xd7E42fa3E6766914A8F581f7a50Ca3c57dfDfE6d',
      example: '0x1AB072502FB398eb4f428D60D01f18e8Ffa01448'
    }
  },
  250: {
    // fantom opera
    owner: mainnetOwner,
    jobid: mainnetJobid,
    link: {
      token: '0x6F43FF82CCA38001B6699a8AC47A2d0E66939407',
      operator: '0x63a5cDF7dFBf8FF017fC6ada2128072079FeBee8',
      example: '0x4864Fe699380B4F5bae4Df7Ea5B0039f7F5d05E7'
    }
  },
  97: {
    // BNB testnet
    owner: testnetOwner,
    jobid: testnetJobid,
    tfi_api_poll: 1000,
    link: {
      token: '0x84b9b910527ad5c03a9ca831909e21e236ea7b06',
      operator: '0x758d864483c685Ad4484984DAcdD44c9c1F62274',
      example: '0x859DF2E0496eAD32c706f292528db62529Dc807d'
    }
  },
  137: {
    // polygon mainnet
    owner: mainnetOwner,
    jobid: mainnetJobid,
    tfi_api_poll: 1000,
    link: {
      token: '0xb0897686c545045afc77cf20ec7a532e3120e0f1',
      operator: '0xd7E42fa3E6766914A8F581f7a50Ca3c57dfDfE6d',
      example: '0xDEB0cd3cB6d45Df7aB11a02b89c19603afCdd4Fe'
    }
  },
  80001: {
    // polygon (mumbai) testnet
    owner: testnetOwner,
    jobid: testnetJobid,
    tfi_api_poll: 1000,
    link: {
      token: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
      operator: '0x6D141Cf6C43f7eABF94E288f5aa3f23357278499',
      example: '0x9De602408AA53F0BB8bC54280A9fb70446289cFC'
    }
  },
  43114: {
    // avalanche mainnet
    owner: mainnetOwner,
    jobid: mainnetJobid,
    link: {
      token: '0x5947BB275c521040051D82396192181b413227A3',
      operator: '0x8EC4012535BEb30acc33950bf8a7981f9c801944',
      example: '0xACd2e1ef6Db249520695dC237b85d3F6f59d6979'
    }
  },
  43113: {
    // fuji testnet
    owner: testnetOwner,
    jobid: testnetJobid,
    link: {
      token: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
      operator: '0xF0ffC609da91d1931314BA5d17F1786db985D801',
      example: '0xa8b7fAc5E2676B8EAb049329C8B7210acE1f8b99'
    }
  },
  4002: {
    // fantom testnet
    owner: testnetOwner,
    jobid: testnetJobid,
    link: {
      token: '0xfaFedb041c0DD4fA2Dc0d87a6B0979Ee6FA7af5F',
      operator: '0xF0ffC609da91d1931314BA5d17F1786db985D801',
      example: '0xa8b7fAc5E2676B8EAb049329C8B7210acE1f8b99'
    }
  },
  42161: {
    // arbitrum one
    owner: mainnetOwnerDeploy,
    jobid: mainnetJobid,
    feed_adapter: '0xF0ffC609da91d1931314BA5d17F1786db985D801',
    feed_registry: '0x860c0901612d581420837406A574ae79ef552EF1',
    link: {
      token: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
      operator: '0x2118c39C092183F9140A339ADB2c3890644b00A2',
      example: '0x5a83Cdb04170ee53FcCccd21a5FB0a4CAD0fddF4',
      wallet: '0xC1a857Fb4ddE9B3bcFa80F6f590E5bCbA3D3b5A6'
    }
  },
  421613: {
    // arbitrum goerli testnet
    owner: testnetOwner,
    jobid: testnetJobid,
    feed_adapter: '0x9De602408AA53F0BB8bC54280A9fb70446289cFC',
    feed_registry: '0x4a4588Eaa43c3C0694F7b8Ade7521ac5b42120Fe',

    link: {
      token: '0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28',
      operator: '0xF0ffC609da91d1931314BA5d17F1786db985D801',
      example: '0x56d04066e9A76ea53505ff2FC90171160212B7A8',
      wallet: '0xed7f757A14B202DCec61E10617A9Ee7B9b699B58'
    }
  }
}

export const address = addressesByChain[5]

export function getConfig (): any {
  const networkName = hre.network.name
  const chainId = hre.network.name != 'localhost' ?
    hre.network.config.chainId : 0
  console.log('Network name=', networkName)
  console.log('Network chain id=', chainId)

  return addressesByChain[chainId]
}
