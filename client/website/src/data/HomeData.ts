import { Singleton } from "../core/game/Singleton";

export class HomeData extends Singleton {
  public get cacheKey(): string {
    return "DB:HomeData";
  }

  async init() {
    await this.loadData();
  }

  async loadData() {}
}
