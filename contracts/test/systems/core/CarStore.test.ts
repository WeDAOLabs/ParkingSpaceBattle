import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("CarStore", function () {
  let erc6551RegistryContract: Contract;
  let erc6551AccountContract: Contract;
  let carNFTContract: Contract;
  let carStoreContract: Contract;

  beforeEach(async function () {
    //deploy ERC6551Registry
    const Erc6551Registry = await ethers.getContractFactory("ERC6551Registry");
    erc6551RegistryContract = await Erc6551Registry.deploy();

    //deploy StandardERC6551Account
    const StandardERC6551Account = await ethers.getContractFactory(
      "StandardERC6551Account"
    );
    erc6551AccountContract = await StandardERC6551Account.deploy();

    const carERC721Contract = await ethers.getContractFactory("CarERC721");
    carNFTContract = await carERC721Contract.deploy();

    const CarStoreContract = await ethers.getContractFactory("CarStore");
    carStoreContract = await CarStoreContract.deploy();
  });

  it("should be deploy", async () => {
    expect(erc6551RegistryContract.address).to.not.null;
    expect(erc6551AccountContract.address).to.not.null;
    expect(carNFTContract.address).to.not.null;
    expect(carStoreContract.address).to.not.null;
  });
});
