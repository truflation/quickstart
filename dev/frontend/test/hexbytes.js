cbor = require('cbor-web')

function hexStringToByteArray(hexString) {
    if (hexString.length % 2 !== 0) {
        throw "Must have an even number of hex digits to convert to bytes";
    }/* w w w.  jav  a2 s .  c o  m*/
    var numBytes = hexString.length / 2;
    var start = 0
    if (hexString.substr(0, 2) == '0x') {
        start = 1
        numBytes = numBytes - 1
    }
    var byteArray = new Uint8Array(numBytes);
    for (var i=start; i<numBytes + start; i++) {
        byteArray[i-start] = parseInt(hexString.substr(i*2, 2), 16);
    }
    return byteArray;
}
let byteArray = hexStringToByteArray("0x190400")
console.log(cbor.decodeFirstSync(byteArray))
byteArray = hexStringToByteArray("0x83fb40ae191c2f339711fbc029e02a4cd982c2fb402aac40990763fc")
console.log(cbor.decodeFirstSync(byteArray))

byteArray = hexStringToByteArray("0x5b333837372e3535353034373631393034382c2d31362e3130353738313338313139393135342c31392e3534353430363534363339373335325d")
console.log(byteArray)
const string = new TextDecoder().decode(byteArray);
console.log(string)
const obj = JSON.parse(string)
console.log(obj)
