import { ContractBase } from "./ContractBase";
import ContractLLTTokenABI from "../abi/contracts/tokens/LLTToken.sol/LLTToken.json";
import { contractData } from "../../data/ContractData";

export class ContractLLTToken extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.LLTToken;
    const contract = new ContractLLTToken(ContractLLTTokenABI, address, "", "");
    return contract.createContract();
  }

  async balanceOf(address: string): Promise<number> {
    const balance = await this.contract.balanceOf(address);
    return balance;
  }

  public registerEvents() {
    // TODO
  }
}
