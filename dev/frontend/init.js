var web3, accounts
window.addEventListener('load', function () {
  const ethereumButton = document.querySelector('.enableEthereumButton')
  const showAccount = document.querySelector('.showAccount')
  ethereumButton.addEventListener('click', () => {
    getAccount()
  })

  async function getAccount () {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    showAccount.innerHTML = accounts[0]
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
  const address = document.getElementById('address').value
  try {
    const wei = await web3.eth.getBalance(address)
    const balance = web3.utils.fromWei(wei, 'ether')
    document.getElementById('output').innerHTML = balance + ' ETH'
  } catch (err) {
    document.getElementById('output').innerHTML = err
  }
}

async function runEcho () {
  const value = document.getElementById('address_api').value
  const retval = mylibrary.foo(value)
  document.getElementById('output_api').innerHTML = JSON.stringify(retval)
}

async function runOracle () {
  try {
    const oracle = new mylibrary.Oracle(
      web3,
      document.getElementById('oracle:address').value,
      accounts[0]
    )
    const abi = document.getElementById('oracle:abi').value
    document.getElementById('oracle:id').innerHTML = ''
    document.getElementById('oracle:output').innerHTML = ''

    const txn = await oracle.send_request(
      document.getElementById('oracle:service').value,
      document.getElementById('oracle:data').value,
      document.getElementById('oracle:keypath').value,
      abi
    )
    const id = txn.events.ChainlinkRequested.returnValues.id
    document.getElementById('oracle:id').innerHTML = id
    oracle.oracle.events.ChainlinkFulfilled(
      {
        filter: { id }
      },
      (error, event) => { console.log('foo', error, event) })
      .on('data', async (event) => {
        const obj = mylibrary.decode(
          web3, abi,
          await oracle.oracle.methods.results(id).call()
        )
        document.getElementById('oracle:output').innerHTML =
                        JSON.stringify(obj)
      })
  } catch (err) {
    document.getElementById('oracle:id').innerHTML = err
    document.getElementById('oracle:output').innerHTML = ''
  }
}
