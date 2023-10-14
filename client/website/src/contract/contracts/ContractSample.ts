import { ContractBase } from "./ContractBase";
import ContractSampleABI from "../abi/contracts/tokens/Sample.sol/Sample.json";
import { contractData } from "../../data/ContractData";

export class ContractSample extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.AirVoyage;
    const contract = new ContractSample(ContractSampleABI, address, "", "");
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
