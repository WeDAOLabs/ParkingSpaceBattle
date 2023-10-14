import { ethers } from "ethers";
import { Singleton } from "../core/game/Singleton";
import { ChainID } from "../const/enum/Chain";
import { EventBus } from "../plugins/EventBus";
import { GameEventWalletAccountChanged } from "../events/GameEventWalletAccountChanged";
import { GameEventWalletChainChanged } from "../events/GameEventWalletChainChanged";
import { GameEventWalletDisconnect } from "../events/GameEventWalletDisconnect";
import { StringUtil } from "../core/utils/StringUtil";
import { GameEventWalletConnected } from "../events/GameEventWalletConnected";
import { registerDataModel } from "./DataRegister";

interface WalletCache {
  address: string;
  chainId: number;
}

const ChainIds = Object.keys(ChainID)
  .filter((key) => !isNaN(Number(ChainID[key as keyof typeof ChainID])))
  .map((key) => ChainID[key as keyof typeof ChainID]);

export class WalletData extends Singleton {
  private _provider: any = null;
  private data: WalletCache = {
    address: "",
    chainId: -1,
  };

  public get ethereum(): any {
    //@ts-ignore
    return window?.ethereum;
  }

  public get hasProvider(): boolean {
    return this.ethereum !== undefined && this.ethereum !== null;
  }

  public get address(): string {
    return this.data.address;
  }

  public get chainId(): number {
    return this.data.chainId;
  }

  public get provider(): any {
    if (!this._provider && this.hasProvider) {
      this._provider = new ethers.providers.Web3Provider(this.ethereum);
    }
    return this._provider;
  }

  constructor() {
    super();
    this.registerProviderEvent();
  }

  init() {}

  private registerProviderEvent() {
    if (!this.hasProvider) {
      return;
    }
    this.ethereum.on("accountsChanged", (accounts: string[]) =>
      EventBus.instance.emit(GameEventWalletAccountChanged.event, accounts)
    );
    this.ethereum.on("chainChanged", (chainId: string) =>
      EventBus.instance.emit(GameEventWalletChainChanged.event, chainId)
    );
    this.ethereum.on("disconnect", () => {
      EventBus.instance.emit(GameEventWalletDisconnect.event);
    });
  }

  public async isChainValid(): Promise<boolean> {
    if (!this.hasProvider) {
      return Promise.resolve(false);
    }
    const currentId = this.data.chainId;
    if (ChainIds.findIndex((id) => id === currentId) >= 0) {
      return Promise.resolve(true);
    }
    const chainId0x = await this.ethereum.request({
      method: "eth_chainId",
    });

    const chainId = parseInt(chainId0x, 16);
    const idx = ChainIds.findIndex((id) => id === chainId);
    return idx >= 0;
  }

  public async changeAccount(account: string) {
    if (StringUtil.isEmpty(account)) {
      await this.disconnect();
    } else {
      this.data.address = account;
      this.saveData();
    }
  }

  public async chainChange(chainId: number) {
    this.data.chainId = chainId;
    this.saveData();
  }

  public async connectWallet(): Promise<void> {
    if (!this.hasProvider) {
      console.error(`there's no provider`);
      return Promise.resolve();
    }
    const chainId0x = await this.ethereum.request({
      method: "eth_chainId",
    });

    const chainId = parseInt(chainId0x, 16);
    const idx = ChainIds.findIndex((id) => id === chainId);
    if (idx < 0) {
      console.error(
        `chain ${chainId} is not supported, please switch your network`
      );
      return Promise.resolve();
    }

    const accounts = await this.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length <= 0) {
      return Promise.resolve();
    }
    const address = accounts[0];
    this.data.address = address;
    this.data.chainId = chainId;

    this.saveData();

    EventBus.instance.emit(GameEventWalletConnected.event, accounts);
  }

  public async disconnect() {
    this.data.address = "";
    this.data.chainId = -1;
    this.saveData();
  }

  private saveData() {
    // TODO
  }
}
export const walletData: Readonly<WalletData> = WalletData.getInstance();

registerDataModel(walletData);