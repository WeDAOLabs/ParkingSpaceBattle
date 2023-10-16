import { ethers } from "hardhat";

async function getContract() {
  const contract = await ethers.getContractAt(
    "LLTToken",
    "0xaA6838b86183E1FA892B1D911F4517724fA52028"
  );
  const [owner] = await ethers.getSigners();

  return contract.connect(owner);
}

async function grantRole() {
  const contract = await getContract();

  //grant minter role to default caller
  const tx = await contract.grantRole(
    ethers.utils.id("MINTER_ROLE"),
    "0x2867E168855aA631255612EA925dC361BA294dE7"
  );
  const receipt = await tx.wait();
  console.log(receipt);
  console.log("LLT grant LotLoot", "done!");
}

async function main() {
  await grantRole();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
