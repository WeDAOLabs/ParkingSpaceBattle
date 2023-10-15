import { IndexDB } from "../plugins/indexDB";
import { Singleton } from "../core/game/Singleton";
import { contractData } from "./ContractData";
import { registerDataModel } from "./DataRegister";
import { PlayerDTO } from "./dto/PlayerDTO";
import { ethers } from "ethers";

export class PlayerData extends Singleton {
  private _playerMap: Map<string, PlayerDTO | null> = new Map();

  public get cacheKey(): string {
    return "DB:ProfileData";
  }

  async init() {
    await this.loadData();
  }

  async loadData() {
    const data = await IndexDB.instance.getItem(this.cacheKey);
    if (data) {
      console.log(data);
    }
  }

  async getPlayerData(
    address: string,
    refresh = false
  ): Promise<PlayerDTO | null> {
    let playerDTO: PlayerDTO | null = null;
    const addr = ethers.utils.getAddress(address);
    if (!refresh) {
      playerDTO = this._playerMap.get(addr) ?? null;
    }
    if (playerDTO) {
      return playerDTO;
    }
    // 停车场
    const parkings = await contractData.parkingERC721Contract.getPlayerParkings(
      address
    );
    // 车辆
    const cars = await contractData.carERC721Contract.getPlayerCars(address);
    // 收益

    playerDTO = PlayerDTO.fillWith({
      address: address,
      parkingTokenIds: parkings,
      carTokenIds: cars,
    });

    if (this._playerMap.has(addr)) {
      this._playerMap.delete(addr);
    }
    this._playerMap.set(addr, playerDTO);

    return playerDTO;
  }
}
export const playerData: Readonly<PlayerData> = PlayerData.getInstance();
registerDataModel(playerData);
