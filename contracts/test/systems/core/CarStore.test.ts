import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

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

    const CarERC721Contract = await ethers.getContractFactory("CarERC721");
    carNFTContract = await upgrades.deployProxy(CarERC721Contract);
    await carNFTContract.deployed();

    const CarStoreContract = await ethers.getContractFactory("CarStore");
    carStoreContract = await upgrades.deployProxy(CarStoreContract, [
      carNFTContract.address,
      erc6551RegistryContract.address,
      erc6551AccountContract.address,
    ]);
    await carStoreContract.deployed();
  });

  it("should be deploy", async () => {
    expect(erc6551RegistryContract).to.not.null;
    expect(erc6551AccountContract).to.not.null;
    expect(carNFTContract).to.not.null;
    expect(carStoreContract).to.not.null;

    expect(carNFTContract).to.be.instanceOf(Contract);
    expect(await carNFTContract.name()).to.equal("LotLootCar");
    expect(await carNFTContract.symbol()).to.equal("LLC");
  });

  it("mint car success", async () => {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    // no auth
    await expect(carStoreContract.connect(addr1).mint()).to.be.reverted;
    // car nft contract grant role to car store contract
    carNFTContract
      .connect(owner)
      .grantRole(ethers.utils.id("MINTER_ROLE"), carStoreContract.address);

    expect(await carStoreContract.connect(addr1).mint()).to.emit(
      carStoreContract,
      "CarMint"
    );

    // next
    const tokenId = await await carStoreContract.connect(addr1).mint();
    console.log("tokenId", tokenId);
  });
});
