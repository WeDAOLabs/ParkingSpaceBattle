import { ethers } from "ethers";
import { contractData } from "../ContractData";
import { BaseDTO } from "./BaseDTO";

export class CarDTO extends BaseDTO {
  tokenId: number = 0;
  parkingTokenId: number = 0;

  owner: string = "";
  parkingOwner: string = "";

  public get isParking(): boolean {
    return this.parkingTokenId > 0;
  }

  public static async create(tokenId: number, parkingTokenId = 0) {
    const carDTO = this.fillWith({
      tokenId: tokenId,
      parkingTokenId: parkingTokenId,
    });

    if (!parkingTokenId) {
      const parking = await contractData.lotLootContract.getCarParking(tokenId);
      console.log("查找停放的车厂", parking);
      carDTO.parkingTokenId = parking;
    }

    const owner = await contractData.carERC721Contract.ownerOf(tokenId);
    carDTO.owner = ethers.utils.getAddress(owner);
    if (carDTO.parkingTokenId > 0) {
      const parkingOwner = await contractData.parkingERC721Contract.ownerOf(
        carDTO.parkingTokenId
      );
      carDTO.parkingOwner = ethers.utils.getAddress(parkingOwner);
    }

    return carDTO;
  }
}
