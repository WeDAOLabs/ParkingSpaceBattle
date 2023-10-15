import { EventBus } from "../plugins/EventBus";
import { Singleton } from "../core/game/Singleton";
import { GameEventWalletAccountChanged } from "./GameEventWalletAccountChanged";
import { GameEventWalletChainChanged } from "./GameEventWalletChainChanged";
import { GameEventWalletDisconnect } from "./GameEventWalletDisconnect";
import { GameEventBuyParkings } from "./GameEventBuyParkings";
import { GameEventGoFriendHome } from "./GameEventGoFriendHome";

export class GameEventManager extends Singleton {
  public initialize() {
    this.initAsyncEventListeners();
  }

  private initAsyncEventListeners() {
    this.addListeners([
      new GameEventWalletAccountChanged(),
      new GameEventWalletChainChanged(),
      new GameEventWalletDisconnect(),
      new GameEventBuyParkings(),
      new GameEventGoFriendHome(),
    ]);
  }

  public addListeners(listeners: any[]) {
    listeners.forEach((listener) => this.addListener(listener));
  }

  public addListener(listener: any) {
    EventBus.instance.on(listener.subject, async () => {
      await listener.execAsync();
    });
  }
}
