import { twitterData } from "./TwitterData";
import { contractData } from "./ContractData";
import { homeData } from "./HomeData";
import { walletData } from "./WalletData";
import { playerData } from "./PlayerData";

const DataCache: any[] = [];

export const registerDataModel = (dataModel: any) => {
  DataCache.push(dataModel);
};

registerDataModel(homeData);
registerDataModel(contractData);
registerDataModel(walletData);
registerDataModel(playerData);
registerDataModel(twitterData);

export const dataModels = DataCache;
