// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { EonDeploy } from "../../deploy/eon-deploy.class";

async function main() {
  const deployer = new EonDeploy();
  const contract = await deployer.deployUpgradeWithData("CarStore", [
    "0x4DDbF5Ddf8819dE761fC708F8A522D341E03cBE5",
    "0x38cf1C772EC1121b5a9cc1A4CCE07B25c71305eE",
    "0x6cf706A92a234652f36995e5004c4Cb72483E529",
  ]);
  console.log("deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
