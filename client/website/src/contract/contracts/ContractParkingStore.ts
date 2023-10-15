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
    return contract.createContract();
  }

  public async buyParkings() {
    await this.contract.mintMax();
  }

  public registerEvents() {
    this.contract.on("ParkingMintMax", (to: string, tokenIds: number[]) => {
      console.log("init parking place", to, tokenIds);
      EventBus.instance.emit(GameEventBuyParkings.event, to, tokenIds);
    });
  }
}
