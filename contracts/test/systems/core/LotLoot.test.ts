import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers, upgrades } from 'hardhat';

describe('Testing the game', function () {
  let lltToken: Contract;
  let carERC721: Contract;
  let parkERC721: Contract;
  let erc6551Registry: Contract;
  let erc6551Account: Contract;
  let carStore: Contract;
  let parkingStore: Contract;
  let lotLoot: Contract;

  beforeEach(async () => {
    const CarERC721 = await ethers.getContractFactory('CarERC721');
    const ParkERC721 = await ethers.getContractFactory('ParkingERC721');
    const ERC6551Registry = await ethers.getContractFactory('ERC6551Registry');
    const ERC6551Account = await ethers.getContractFactory(
      'StandardERC6551Account'
    );
    const CarStore = await ethers.getContractFactory('CarStore');
    const ParkingStore = await ethers.getContractFactory('ParkingStore');
    const LotLoot = await ethers.getContractFactory('LotLoot');
    const ttlTokenFactory = await ethers.getContractFactory('TTLToken');
    lltToken = await upgrades.deployProxy(ttlTokenFactory);
    erc6551Registry = await upgrades.deployProxy(ERC6551Registry);
    erc6551Account = await upgrades.deployProxy(ERC6551Account);

    carERC721 = await upgrades.deployProxy(CarERC721);
    parkERC721 = await upgrades.deployProxy(ParkERC721);

    carStore = await upgrades.deployProxy(CarStore, [
      carERC721.address,
      erc6551Registry.address,
      erc6551Account.address
    ]);
    parkingStore = await upgrades.deployProxy(ParkingStore, [
      parkERC721.address,
      erc6551Registry.address,
      erc6551Account.address
    ]);
    lotLoot = await upgrades.deployProxy(LotLoot, [
      lltToken.address,
      carERC721.address,
      parkERC721.address,
      erc6551Registry.address,
      erc6551Account.address
    ]);

    await lotLoot.deployed();
  });
  it('success deploy', async () => {
    expect(await carERC721.address).to.not.equal(null);
    expect(await parkERC721.address).to.not.equal(null);
    expect(await carStore.address).to.not.equal(null);
    expect(await parkingStore.address).to.not.equal(null);
    expect(await lotLoot.address).to.not.equal(null);
  });

  it('park test', async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const MINTER_ROLE = ethers.utils.id('MINTER_ROLE');
    carERC721.connect(owner).grantRole(MINTER_ROLE, carStore.address);
    parkERC721.connect(owner).grantRole(MINTER_ROLE, parkingStore.address);

    await carStore.connect(addr1).mint();
    const carTokenId1 = await carERC721.tokenOfOwnerByIndex(addr1.address, 0);

    await parkingStore.connect(addr1).mint();
    const parkTokenId1 = await parkERC721.tokenOfOwnerByIndex(addr1.address, 0);

    await carStore.connect(addr2).mint();
    const carTokenId2 = await carERC721.tokenOfOwnerByIndex(addr2.address, 0);

    await parkingStore.connect(addr2).mint();
    const parkTokenId2 = await parkERC721.tokenOfOwnerByIndex(addr2.address, 0);

    await parkingStore.connect(addr2).mint();
    const parkTokenId3 = await parkERC721.tokenOfOwnerByIndex(addr2.address, 1);

    await carStore.connect(addr1).mint();
    const carTokenId3 = await carERC721.tokenOfOwnerByIndex(addr1.address, 1);

    await lotLoot.connect(addr1).parkCar(carTokenId1, parkTokenId2);
    await lotLoot.connect(addr2).parkCar(carTokenId2, parkTokenId1);
    // success parking
    expect(await lotLoot.viewCarOnPark(carTokenId1)).to.equal(parkTokenId2);
    // can't park a parked setting
    await expect(
      lotLoot.connect(addr1).parkCar(carTokenId3, parkTokenId2)
    ).to.be.revertedWith('Park is already full');

    await expect(
      lotLoot.connect(addr1).parkCar(carTokenId1, parkTokenId3)
    ).to.be.revertedWith('Car is already parked');
  });

  it('test unpark', async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const MINTER_ROLE = ethers.utils.id('MINTER_ROLE');
    carERC721.connect(owner).grantRole(MINTER_ROLE, carStore.address);
    parkERC721.connect(owner).grantRole(MINTER_ROLE, parkingStore.address);

    await carStore.connect(addr1).mint();
    const carTokenId1 = await carERC721.tokenOfOwnerByIndex(addr1.address, 0);

    await parkingStore.connect(addr1).mint();
    const parkTokenId1 = await parkERC721.tokenOfOwnerByIndex(addr1.address, 0);

    await carStore.connect(addr2).mint();
    const carTokenId2 = await carERC721.tokenOfOwnerByIndex(addr2.address, 0);

    await parkingStore.connect(addr2).mint();
    const parkTokenId2 = await parkERC721.tokenOfOwnerByIndex(addr2.address, 0);

    await parkingStore.connect(addr2).mint();
    const parkTokenId3 = await parkERC721.tokenOfOwnerByIndex(addr2.address, 1);

    await carStore.connect(addr1).mint();
    const carTokenId3 = await carERC721.tokenOfOwnerByIndex(addr1.address, 1);

    await lotLoot.connect(addr1).parkCar(carTokenId1, parkTokenId2);
    await lotLoot.connect(addr2).parkCar(carTokenId2, parkTokenId1);

    await lotLoot.connect(addr1).unParkCar(carTokenId1);
    await expect(
      lotLoot.connect(addr1).unParkCar(carTokenId2)
    ).to.be.revertedWith('Not owner of car');

    expect(await lotLoot.viewCarOnPark(carTokenId1)).to.equal(0);
  });

  it('test handle unpark', async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const MINTER_ROLE = ethers.utils.id('MINTER_ROLE');
    carERC721.connect(owner).grantRole(MINTER_ROLE, carStore.address);
    parkERC721.connect(owner).grantRole(MINTER_ROLE, parkingStore.address);
  });
});
