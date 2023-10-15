import { ContractBase } from "./ContractBase";
import ContractParkingERC721ABI from "../abi/contracts/tokens/ParkingERC721.sol/ParkingERC721.json";
import { contractData } from "../../data/ContractData";

export class ContractParkingERC721 extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.ParkingERC721;
    const contract = new ContractParkingERC721(
      ContractParkingERC721ABI,
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
