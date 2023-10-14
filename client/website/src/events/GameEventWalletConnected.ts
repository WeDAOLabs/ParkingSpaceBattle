import { GameEventBase } from "./GameEventBase";

export class GameEventWalletConnected extends GameEventBase {
  public static readonly event: string = "game.logic.GameEventWalletConnected";
}
