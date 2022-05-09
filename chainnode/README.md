Here are scripts to work with the flexible API based adapters for
chainlink.

The goal of this is to pass data from the blockchain directly to the
back and and then back again.  This sent of adapters does encoding and
decoding allowing the backend to change the API and pass it through the
chainlink layer.

cd utils
docker-compose up

address: address of your deployed contract
service: echo
data: {"foo": 1024}
