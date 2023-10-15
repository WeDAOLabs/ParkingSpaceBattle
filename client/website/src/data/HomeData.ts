import { EventBus } from "../plugins/EventBus";
import { Singleton } from "../core/game/Singleton";
import { registerDataModel } from "./DataRegister";
import { GameEventGoFriendHome } from "../events/GameEventGoFriendHome";
import { GO_HOME } from "../const/Constants";
import { walletData } from "./WalletData";

export class HomeData extends Singleton {
  private _currentUserAddress: string | null = null;

  public get currentPlyer(): string {
    return this._currentUserAddress
      ? this._currentUserAddress
      : walletData.address;
  }

  async init() {
    EventBus.instance.on(GameEventGoFriendHome.eventAsync, this.onChangeScene);
  }

  private onChangeScene(address: string) {
    if (address === GO_HOME) {
      this._currentUserAddress = null;
    } else {
      this._currentUserAddress = address;
    }
  }
}

export const homeData: Readonly<HomeData> = HomeData.getInstance();
registerDataModel(homeData);
