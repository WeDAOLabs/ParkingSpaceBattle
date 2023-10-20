import { Singleton } from "../core/game/Singleton";
import { registerDataModel } from "./DataRegister";

export class TwitterData extends Singleton {}

export const twitterData: Readonly<TwitterData> = TwitterData.getInstance();
registerDataModel(twitterData);
