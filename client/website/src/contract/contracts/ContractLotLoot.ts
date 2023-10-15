import { ContractBase } from "./ContractBase";
import ContractLotLootABI from "../abi/contracts/systems/core/LotLoot.sol/LotLoot.json";
import { contractData } from "../../data/ContractData";
import { EventBus } from "../../plugins/EventBus";
import { GameEventParkCar } from "@/events/GameEventParkCar";

export class ContractLotLoot extends ContractBase {
  static create(): any {
    const address = contractData.contractAddress.LotLoot;
    const contract = new ContractLotLoot(ContractLotLootABI, address, "", "");
    return contract.createContract();
  }

  async park(carTokenId: number, parkingTokenId: number) {
    await this.contract.parkCar(carTokenId, parkingTokenId);
  }

  async unPark(carTokenId: number) {
    await this.contract.unParkCar(carTokenId);
  }

  async fineCar(parkingTokenId: number) {
    await this.contract.fineCar(parkingTokenId);
  }

  async getCarParking(carTokenId: number): Promise<number> {
    const parkingTokenId = await this.contract.viewCarOnPark(carTokenId);
    return parkingTokenId;
  }

  async getParkingCar(parkingTokenId: number): Promise<number> {
    const carTokenId = await this.contract.viewParkOnCar(parkingTokenId);
    return carTokenId;
  }

  public registerEvents() {
    this.contract.on(
      "ParkCar",
      (who: string, carTokenId: number, parkingTokenId: number) => {
        console.log("ParkCar", who, carTokenId, parkingTokenId);
        EventBus.instance.emit(
          GameEventParkCar.event,
          who,
          carTokenId,
          parkingTokenId
        );
      }
    );

    this.contract.on(
      "UnParkCar",
      (who: string, carTokenId: number, parkingTokenId: number) => {
        console.log("UnParkCar", who, carTokenId, parkingTokenId);
        EventBus.instance.emit(
          GameEventParkCar.event,
          who,
          carTokenId,
          parkingTokenId
        );
      }
    );

    this.contract.on(
      "FineCar",
      (who: string, carTokenId: number, parkingTokenId: number) => {
        console.log("FineCar", who, carTokenId, parkingTokenId);
        EventBus.instance.emit(
          GameEventParkCar.event,
          who,
          carTokenId,
          parkingTokenId
        );
      }
    );
  }
}
