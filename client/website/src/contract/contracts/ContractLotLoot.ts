import { ContractBase } from "./ContractBase";
import ContractLotLootAI from "../abi/contracts/systems/core/LotLoot.sol/LotLoot.json";
import { contractData } from "../../data/ContractData";

export class ContractLotLoot extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.LotLoot;
    const contract = new ContractLotLoot(ContractLotLootAI, address, "", "");
    return contract.createContract();
  }

  public registerEvents() {
    // TODO
  }
}
