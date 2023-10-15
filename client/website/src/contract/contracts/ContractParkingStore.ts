import { ContractBase } from "./ContractBase";
import ContractParkingStoreABI from "../abi/contracts/systems/core/ParkingStore.sol/ParkingStore.json";
import { contractData } from "../../data/ContractData";
import { EventBus } from "../../plugins/EventBus";
import { GameEventBuyParkings } from "../../events/GameEventBuyParkings";

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

  public async buyParkings() {
    const contract = contractData.parkingStoreContract;
    await contract.mintMax();
  }

  public registerEvents(contractIns: any, currentGameId?: any) {
    if (!contractIns) {
      return;
    }

    contractIns.on("ParkingMintMax", (to: string, tokenIds: number[]) => {
      console.log("init parking place", to, tokenIds);
      EventBus.instance.emit(GameEventBuyParkings.eventAsync, to, tokenIds);
    });
  }
}
