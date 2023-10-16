import { playerData } from "@/data/PlayerData";
import { GameEventBase } from "./GameEventBase";

export class GameEventFineCar extends GameEventBase {
  public static readonly event: string = "game.logic.GameEventFineCar";

  public get subject(): string {
    return GameEventFineCar.event;
  }

  public async exec(who: string, carTokenId: number, parkTokenId: number) {
    console.log("fine car complete", who, carTokenId, parkTokenId);
    await playerData.getPlayerData(who, true);
  }
}
