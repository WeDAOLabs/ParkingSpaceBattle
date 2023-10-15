import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

describe('Testing the game', function () {
  let carERC721: Contract;
  let parkERC721: Contract;

  let lotLoot: Contract;

  beforeEach(async () => {
    const CarERC721 = await ethers.getContractFactory('CarERC721');
    const ParkERC721 = await ethers.getContractFactory('ParkingERC721');

    const LotLoot = await ethers.getContractFactory('LotLoot');

    carERC721 = await CarERC721.deploy();
    parkERC721 = await ParkERC721.deploy();
    lotLoot = await LotLoot.deploy();
  });
  it('success deploy', async () => {
    expect(await carERC721.address).to.not.equal(null);
    expect(await parkERC721.address).to.not.equal(null);
    expect(await lotLoot.address).to.not.equal(null);
  });

  it('park test', async () => {
    const carTokenId1 = 1000;
    const carTokenId2 = 1001;
    const parkTokenId1 = 2000;
    const [owner, addr1, addr2] = await ethers.getSigners();

    carERC721.safeMint(owner.address, carTokenId1);

    carERC721.grantRole(ethers.utils.id('MINTER_ROLE'), addr1.address);
    carERC721.connect(addr1).safeMint(addr1.address, carTokenId2);

    parkERC721.safeMint(owner.address, parkTokenId1);

    lotLoot.upgradeNFT(carERC721.address, parkERC721.address);

    lotLoot.parkCar(carTokenId1, parkTokenId1);
    // success parking
    expect(await lotLoot.viewCarOnPark(carTokenId1)).to.equal(parkTokenId1);
    // can't park a parked setting
    await expect(lotLoot.parkCar(carTokenId2, parkTokenId1)).to.be.revertedWith(
      'Park is already full'
    );
  });

  // it("test unpark",async() =>{
  //   const carTokenId1 = 1000;
  //   const carTokenId2 = 1001;
  //   const parkTokenId1 = 2000;
  //   const parkTokenId2 = 2001;
  //   const [owner, addr1, addr2] = await ethers.getSigners();

  //   carERC721.safeMint(owner.address, carTokenId1);
  //   carERC721.grantRole(ethers.utils.id('MINTER_ROLE'), addr1.address);

  // })
});
