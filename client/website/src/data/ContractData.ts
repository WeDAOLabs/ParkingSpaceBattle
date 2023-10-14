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

export class ContractData extends Singleton {
  private _sampleContractIns: any = null!;

  public get sampleContract(): any {
    if (!this._sampleContractIns) {
      this._sampleContractIns = ContractSample.create();
    }
    return this._sampleContractIns;
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
