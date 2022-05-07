var web3, accounts
window.addEventListener('load', function () {
  const ethereumButton = document.querySelector('.enableEthereumButton')
  const showAccount = document.querySelector('.showAccount')
  const balanceAddress = document.querySelector('#balance\\:address')
  ethereumButton.addEventListener('click', () => {
    getAccount()
  })

  async function getAccount () {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    showAccount.innerHTML = accounts[0]
    balanceAddress.value = accounts[0]
    document.getElementById('inflation:address').value =
      '0x769dadc1bdBAF9d129D54981636Dcd96EdB57c0d'
    document.querySelector('.showChain').innerHTML =
            window.ethereum.networkVersion
  }

  if (typeof web3 !== 'undefined') {
    console.log('Web3 Detected! ' + window.ethereum.constructor.name)
    web3 = new Web3(window.ethereum)
  } else {
    console.log('No Web3 Detected... using HTTP Provider')
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/<APIKEY>'))
  }
})
async function getBalance () {
  const address = document.getElementById('balance:address').value
  try {
    const wei = await web3.eth.getBalance(address)
    const balance = web3.utils.fromWei(wei, 'ether')
    document.getElementById('balance:output').innerHTML = balance + ' ETH'
  } catch (err) {
    document.getElementById('balance:output').innerHTML = err
  }
}

async function getInflation () {
  try {
    const address = document.getElementById('inflation:address').value
    const contract = new web3.eth.Contract(inflation_abi, address)
    document.getElementById('inflation:output').innerHTML =
      await contract.methods.inflation().call()
  } catch (err) {
    document.getElementById('inflation:output').innerHTML = err
  }
}

async function requestInflationData () {
  try {
    const address = document.getElementById('inflation:address').value
    const contract = new web3.eth.Contract(inflation_abi, address)
    console.log(contract)
    const link_token = await contract.methods.getChainlinkToken().call()
    console.log(link_token)
    document.getElementById('inflation:output').innerHTML = ''
    const token_contract = new web3.eth.Contract(
      erc20_abi, link_token
    )
    const fee = await contract.methods.fee().call()
    console.log(fee)
    const transfer = token_contract.methods.transfer(
      address, fee
    )
    await transfer.send({
      from: accounts[0],
      to: address
    })
    const request = contract.methods.requestInflationData()
    
    const txn = await request.send({
      from: accounts[0],
      to: address
    })
    const id = txn.events.ChainlinkRequested.returnValues.id
    contract.events.ChainlinkFulfilled(
      {
        filter: { id }
      },
      (error, event) => { console.log('foo', error, event) })
      .on('data', async (event) => {
        document.getElementById('inflation:output').innerHTML =
          await contract.methods.inflation().call()
      })
  } catch (err) {
    document.getElementById('inflation:output').innerHTML = err
  }
}
