import { ethers } from "hardhat";

async function getContract() {
  const contract = await ethers.getContractAt(
    "ParkingERC721",
    "0xb792f1E31D3a19DB2C8A88eE10b35D8bC2DEA6A5"
  );
  const [owner] = await ethers.getSigners();

  return contract.connect(owner);
}

async function grantRole() {
  const contract = await getContract();

  //grant minter role to default caller
  const tx = await contract.grantRole(
    ethers.utils.id("MINTER_ROLE"),
    "0x5BdaD15499d8f1566938EbB7C7b28352638b8326"
  );
  const receipt = await tx.wait();
  console.log(receipt);
  console.log("Auth ParkingStore", "done!");
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
