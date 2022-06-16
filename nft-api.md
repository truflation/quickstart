This file allows API queries to get NFT Index information

These can be tested via the [API Tester](https://truflation.github.io/sample-frontend/power-tools.html)

The API can be called via a smart contract via the sample [APIClient](https://remix.ethereum.org/#url=https://raw.githubusercontent.com/truflation/sample-frontend/main/ApiClient.sol).

The call is controlled via a service call which can be either "list", "index", or "contracts".  In the absence of an explcit service call, "index" is assumed

To get the current value of an index

```
{"index": "nft/top11"}
```

To get the value of an index at a particular time

```
{"index": "nft/top11", "date": "2021-10-10"}
```

To get a list of NFT indexes is available via the API call.  The size of the response requires that
the results be delivered via ipfs.

```
{"service": "list", "abi": "ipfs"} 
```

To get a list of contracts for an NFT index such as top11, the call is

```
{"service": "contracts", "index": "nft/top11", "abi": "ipfs"}
```

The index name for each index is as follows

| Index name | Index descriptions |
| ------- | ---------- |
| nft/top11 | Top 11 |
| metaverse/land | Metaverse Land |
| utility/irl | Utility - IRL experiences | 
| utility/dao | Utility - DAOs |
| utility/membership/discovered | Utility - Membership (discovered) |
| utility/membership/selected | Utility - Membership (selected) |
| artwork/handdrawn | Artwork - Hand drawn |
| artwork/generative | Artwork - Generative |
| artwork/virtual | Artwork - Virtual |
| music/generative | Music - Generative |
| music/collections/genesis | Music Collections - Genesis |
| music/collections/season1 | Music Collections - Season 1 |
| music/collections/season2 | Music Collections - Season 2 |

Also indexes are available for these individual nfts
| Index name | Description |
|----------  | -------     |
| nft/bayc | BAYC |
| nft/ethlizards | ETH Lizards |


