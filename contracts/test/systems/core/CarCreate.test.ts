import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

describe('CarCreate', function () {
  let lotLootERC6551Registry: Contract;
  let lotLootERC6551Account: Contract;
  let carCreate: Contract;
  let carERC721: Contract;

  let chainId: number;

  beforeEach(async function () {
    // deploy carERC721
    const carERC721Contract = await ethers.getContractFactory('CarERC721');
    carERC721 = await carERC721Contract.deploy();
    console.log('CarERC721 deployed to:', carERC721.address);
    // deploy carERC6551Registry
    const lotLootERC6551RegistryContract = await ethers.getContractFactory(
      'LotLootERC6551Registry'
    );
    lotLootERC6551Registry = await lotLootERC6551RegistryContract.deploy();

    console.log(
      'LotLootERC6551Registry deployed to:',
      lotLootERC6551Registry.address
    );
    // deploy carERC6551Account
    const lotLootERC6551AccountContract = await ethers.getContractFactory(
      'LotLootERC6551Account'
    );
    lotLootERC6551Account = await lotLootERC6551AccountContract.deploy();
    console.log(
      'LotLootERC6551Account deployed to:',
      lotLootERC6551Account.address
    );
    chainId = await ethers.provider.getNetwork().chainId;
    const carCreateContract = await ethers.getContractFactory('CarCreate');

    carCreate = await carCreateContract.deploy(carCreateContract);
  });
  it('should be deploy', async () => {
    expect(lotLootERC6551Registry.address).to.not.eq(0x0);
    expect(lotLootERC6551Account.address).to.not.eq(0x0);
    expect(carERC721.address).to.not.eq(0x0);

    expect(carCreate.address).to.not.eq(0x0);
  });
});
