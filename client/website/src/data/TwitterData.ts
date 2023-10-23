import { StringUtil } from "../core/utils/StringUtil";
import { Singleton } from "../core/game/Singleton";
import { APP_NAME } from "../const/Constants";

export class TwitterData extends Singleton {
  public get tid(): string {
    return StringUtil.xor(`${process.env.VUE_APP_TOKEN_X_APP_ID}`, APP_NAME);
  }

  public get token(): string {
    return `${StringUtil.xor(
      `${process.env.VUE_APP_TOKEN_X_APP_SEC}`,
      APP_NAME
    )}jFRcPFELxnTqkO7V0pSf3J7JrCU_MSPnTYJ-OW-2t`;
  }

  async init() {
    console.log("环境", this.tid, this.token);
  }
}

export const twitterData: Readonly<TwitterData> = TwitterData.getInstance();
