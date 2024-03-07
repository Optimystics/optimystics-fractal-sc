# Optimystics smart contracts
Smart contract enabling a community to play the [Respect Game](https://optimismfractal.com/details) and award Respect NTT for it.

## Run / test
```shell
npm install
mv .env-example .env
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
```

## Deploy
First you will need to populate `.env` file with relevant values. Which values you will need depends on what network you want to deploy to.

This deploys actual contracts. `NETWORK` is one of the networks configured in `hardhat.config.ts`. 
```shell
npx hardhat --network NETWORK run scripts/deployMain.ts
```

Next you'll probably want to verify your deployment with a block explorer:
```shell
npx hardhat verify --network opGoerli IMPLEMENTATION_ADDRESS CONSTRUCTOR_ARGS
```

Here `IMPLEMENTATION_ADDRESS` is an address of implementation deployed in step 1. `CONSTRUCTOR_ARGS` are constructor args that were used to deploy that implementation contract. You can find them in `deployMain.ts` [here](https://github.com/Optimystics/optimystics-fractal-sc/blob/354639c23aa824c194f67a4846a48dff8b1b2a4e/scripts/deployMain.ts#L25).


## Deployments
* Optimism Sepolia: [0x6b11FC2cec86edeEd1F3705880deB9010F0D584B](https://sepolia-optimism.etherscan.io/address/0x6b11fc2cec86edeed1f3705880deb9010f0d584b)


