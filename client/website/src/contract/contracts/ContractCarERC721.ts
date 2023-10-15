import { ContractBase } from "./ContractBase";
import ContractCarERC721ABI from "../abi/contracts/tokens/CarERC721.sol/CarERC721.json";
import { contractData } from "../../data/ContractData";

export class ContractCarERC721 extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.CarERC721;
    const contract = new ContractCarERC721(
      ContractCarERC721ABI,
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
