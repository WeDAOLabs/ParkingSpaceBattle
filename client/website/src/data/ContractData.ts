import {
  CONTRACT_ADDRESS_ARBITRUM,
  CONTRACT_ADDRESS_MUMBAI,
  IContractAddress,
} from "../const/Contracts";
import { ChainID } from "../const/enum/Chain";
import { ContractSample } from "../contract/contracts/ContractSample";
import { Singleton } from "../core/game/Singleton";
import { registerDataModel } from "./DataRegister";
import { walletData } from "./WalletData";
import { ContractParkingStore } from "../contract/contracts/ContractParkingStore";
import { ContractCarERC721 } from "../contract/contracts/ContractCarERC721";
import { ContractParkingERC721 } from "../contract/contracts/ContractParkingERC721";
import { ContractCarStore } from "../contract/contracts/ContractCarStore";

export class ContractData extends Singleton {
  private _sampleContractIns: any = null!;
  private _carStoreContractIns: any = null!;
  private _parkingStoreContractIns: any = null!;
  private _carERC721ContractIns: any = null!;
  private _parkingERC721StoreContractIns: any = null!;

  public get sampleContract(): any {
    if (!this._sampleContractIns) {
      this._sampleContractIns = ContractSample.create();
    }
    return this._sampleContractIns;
  }

  public get carStoreContract(): any {
    if (!this._carStoreContractIns) {
      this._carStoreContractIns = ContractCarStore.create();
    }
    return this._carStoreContractIns;
  }

  public get parkingStoreContract(): any {
    if (!this._parkingStoreContractIns) {
      this._parkingStoreContractIns = ContractParkingStore.create();
    }
    return this._parkingStoreContractIns;
  }

  public get carERC721Contract(): any {
    if (!this._carERC721ContractIns) {
      this._carERC721ContractIns = ContractCarERC721.create();
    }
    return this._carERC721ContractIns;
  }

  public get parkingERC721Contract(): any {
    if (!this._parkingERC721StoreContractIns) {
      this._parkingERC721StoreContractIns = ContractParkingERC721.create();
    }
    return this._parkingERC721StoreContractIns;
  }

  public get contractAddress(): IContractAddress {
    if (walletData.chainId === ChainID.Mumbai) {
      return CONTRACT_ADDRESS_MUMBAI;
    } else if (walletData.chainId === ChainID.Arbitrum) {
      return CONTRACT_ADDRESS_ARBITRUM;
    }
    return CONTRACT_ADDRESS_MUMBAI;
  }

  init() {}
}
export const contractData: Readonly<ContractData> = ContractData.getInstance();

registerDataModel(contractData);
