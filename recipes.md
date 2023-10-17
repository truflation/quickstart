These are some recipes that you can use at https://marketplace.truflation.com/

The preferred chain to use is Arbitrium and Arbritrum Testnet

* Get flatcoin index in int256 format and wei
```
{
"service": "truflation/ticker",
"data": {"symbol" : "com.truflation.flatcoin.price"},
"keypath": "com.truflation.flatcoin.price,value", 
"abi": "int256",
"multiplier": "1000000000000000000"
}
```
* Symbols available are

** com.truflation.gold
** com.truflation.electric_vehicles.yoy
** com.truflation.electric_vehicles.index
** com.truflation.us.cpi

Treasury yields are available via

com.truflation.us.trsry.yld.(tenor).(value)

Where tenor is 1m, 3m, 6m, 1y
and value is open, high, low, close

