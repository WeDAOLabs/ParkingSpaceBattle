import { playerData } from "@/data/PlayerData";
import { GameEventBase } from "./GameEventBase";

export class GameEventGoFriendHome extends GameEventBase {
  public static readonly event: string = "game.logic.GameEventGoFriendHome";

  public get subject(): string {
    return GameEventGoFriendHome.event;
  }

  public async exec(address: string) {
    await playerData.getPlayerData(address, true);
  }
}
