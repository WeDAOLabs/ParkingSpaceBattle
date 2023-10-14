const DataCache: any[] = [];

export const registerDataModel = (dataModel: any) => {
  DataCache.push(dataModel);
};

export const dataModels = DataCache;
