import {
  CONTRACT_ADDRESS_ARBITRUM,
  CONTRACT_ADDRESS_MUMBAI,
  IContractAddress,
} from "../const/Contracts";
import { ChainID } from "../const/enum/Chain";
import { Singleton } from "../core/game/Singleton";
import { registerDataModel } from "./DataRegister";
import { walletData } from "./WalletData";
import { ContractParkingStore } from "../contract/contracts/ContractParkingStore";
import { ContractCarERC721 } from "../contract/contracts/ContractCarERC721";
import { ContractParkingERC721 } from "../contract/contracts/ContractParkingERC721";
import { ContractCarStore } from "../contract/contracts/ContractCarStore";
import { ContractLotLoot } from "../contract/contracts/ContractLotLoot";
import { ContractLLTToken } from "../contract/contracts/ContractLLTToken";

export class ContractData extends Singleton {
  private _carStoreContractIns: any = null!;
  private _parkingStoreContractIns: any = null!;
  private _carERC721ContractIns: any = null!;
  private _parkingERC721StoreContractIns: any = null!;
  private _lotLootContractIns: any = null;
  private _lltTokenContractIns: any = null;

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

  public get lotLootContract(): any {
    if (!this._lotLootContractIns) {
      this._lotLootContractIns = ContractLotLoot.create();
    }
    return this._lotLootContractIns;
  }

  public get lltTokenContract(): any {
    if (!this._lltTokenContractIns) {
      this._lltTokenContractIns = ContractLLTToken.create();
    }
    return this._lltTokenContractIns;
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
