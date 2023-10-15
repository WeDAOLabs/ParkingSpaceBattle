import { ContractBase } from "./ContractBase";
import ContractParkingStoreABI from "../abi/contracts/systems/core/ParkingStore.sol/ParkingStore.json";
import { contractData } from "../../data/ContractData";

export class ContractParkingStore extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.ParkingStore;
    const contract = new ContractParkingStore(
      ContractParkingStoreABI,
      address,
      "",
      ""
    );
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
