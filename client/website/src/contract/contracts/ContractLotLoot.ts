import { ContractBase } from "./ContractBase";
import ContractLotLootABI from "../abi/contracts/systems/core/LotLoot.sol/LotLoot.json";
import { contractData } from "../../data/ContractData";

export class ContractLotLoot extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.LotLoot;
    const contract = new ContractLotLoot(ContractLotLootABI, address, "", "");
    return contract.createContract();
  }

  public registerEvents() {
    // TODO
  }
}
