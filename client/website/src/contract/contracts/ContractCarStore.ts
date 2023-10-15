import { ContractBase } from "./ContractBase";
import ContractCarStoreABI from "../abi/contracts/systems/core/CarStore.sol/CarStore.json";
import { contractData } from "../../data/ContractData";

export class ContractCarStore extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.CarStore;
    const contract = new ContractCarStore(ContractCarStoreABI, address, "", "");
    const contractWithSigner = contract.createContract();
    contract.registerEvents(contractWithSigner);
    return contractWithSigner;
  }

  public registerEvents(contractIns: any, currentGameId?: any) {
    if (!contractIns) {
      return;
    }

    // TODO
  }
}
