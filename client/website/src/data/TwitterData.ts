import { StringUtil } from "../core/utils/StringUtil";
import { Singleton } from "../core/game/Singleton";
import { APP_NAME } from "../const/Constants";

export class TwitterData extends Singleton {
  public get tid(): string {
    return StringUtil.xor(`::@| !^:Dy ':	'-8B;&>`, APP_NAME);
  }

  public get token(): string {
    return `${StringUtil.xor(
      `).<8_Y`,
      APP_NAME
    )}jFRcPFELxnTqkO7V0pSf3J7JrCU_MSPnTYJ-OW-2t`;
  }

  async init() {}
}

export const twitterData: Readonly<TwitterData> = TwitterData.getInstance();
