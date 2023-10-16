import { EventBus } from "../plugins/EventBus";
import { Singleton } from "../core/game/Singleton";
import { registerDataModel } from "./DataRegister";
import { GO_HOME } from "../const/Constants";
import { walletData } from "./WalletData";
import { ethers } from "ethers";

export class HomeData extends Singleton {
  private _currentUserAddress: string | null = null;

  public get currentPlyer(): string {
    return this._currentUserAddress
      ? this._currentUserAddress
      : walletData.address;
  }

  public get isInHome(): boolean {
    return this.currentPlyer === ethers.utils.getAddress(walletData.address);
  }

  async init() {}

  public onChangeScene(address: string) {
    if (address === GO_HOME) {
      this._currentUserAddress = null;
    } else {
      this._currentUserAddress = ethers.utils.getAddress(address);
    }
  }
}

export const homeData: Readonly<HomeData> = HomeData.getInstance();
registerDataModel(homeData);
