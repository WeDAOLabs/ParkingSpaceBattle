import { GameEventBase } from "./GameEventBase";

export class GameEventBuyParkings extends GameEventBase {
  public static readonly event: string = "game.logic.GameEventBuyParkings";

  public get subject(): string {
    return GameEventBuyParkings.event;
  }

  public async exec(to: string, tokenIds: number[]) {
    console.log("buy parking place complete", to, tokenIds);
  }
}
