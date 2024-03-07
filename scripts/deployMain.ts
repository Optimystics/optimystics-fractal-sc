import { ethers, upgrades } from "hardhat";
import { FractalRespect } from "../typechain-types/contracts";
import "dotenv/config"

const implOwner = process.env.OP_IMPL_OWNER_ADDR;
const implExec = process.env.OP_IMPL_EXEC_ADDR;
const proxyOwner = process.env.OP_PROXY_OWNER_ADDR;
const proxyExec = process.env.OP_PROXY_EXEC_ADDR;

export async function deployFractalRespect() {
  const signers = await ethers.getSigners();

  const factory = await ethers.getContractFactory("FractalRespect", signers[0]!);
  const ranksDelay = 345600; // 4 days

  const feeData = await ethers.provider.getFeeData();

  // FIXME: why do I have to do a typecast here?
  const proxyFromOwner = (await upgrades.deployProxy(
    factory,
    ["Optimystics Fractal", "OMF", proxyOwner, proxyExec, ranksDelay],
    {
      kind: 'uups',
      initializer: "initializeV2Whole(string,string,address,address,uint64)",
      constructorArgs: ['ImplFractal', 'IF', implOwner, implExec, 345600],
      txOverrides: {
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        maxFeePerGas: feeData.maxFeePerGas
      }
    },
  ) as unknown) as FractalRespect;

  return {
    proxyFromOwner,
    proxyOwner,
    factory,
    signers,
    ranksDelay,
  };
}

async function main() {
  const vars = await deployFractalRespect();

  console.log('Deployed: ', vars);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
