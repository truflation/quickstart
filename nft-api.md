This file allows API queries to get NFT Index information

These can be tested via the [API Tester](https://truflation.github.io/sample-frontend/power-tools.html)

A smart contract that executes uses the API is [available](https://remix.ethereum.org/#url=https://raw.githubusercontent.com/truflation/sample-frontend/main/ApiClient.sol).

The call is controlled via a service call which can be either "list", "index", or "contracts".  In the absence of an explcit service call, "index" is assumed

To get the current value of an index

```
{"index": "nft/top11"}
```

To get the value of an index at a particular time

```
{"index": "nft/top11", "date": "2021-10-10"}
```

To get a list of NFT indexes is available via the API call

```
{"service": "list"} 
```

To get a list of contracts for an NFT index such as top11, the call is

```
{"service": "contracts", "index": "nft/top11"}
```

The list of supported indexes are:

* nft/top11
* metaverse/land
* utility/irl
* utility/dao
* utility/membership/discovered
* utility/membership/selected
* artwork/handdrawn
* artwork/virtual
* artwork/generative
* music/generative
* music/collections/genesis
* music/collections/season1
* music/collections/season2
