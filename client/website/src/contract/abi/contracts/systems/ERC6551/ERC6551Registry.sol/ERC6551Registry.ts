import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  ERC6551Registry,
  ERC6551RegistryMethodNames,
  ERC6551RegistryEventsContext,
  ERC6551RegistryEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type ERC6551RegistryEvents = 'AccountCreated';
export interface ERC6551RegistryEventsContext {
  AccountCreated(...parameters: any): EventFilter;
}
export type ERC6551RegistryMethodNames = 'account' | 'createAccount';
export interface AccountCreatedEventEmittedResponse {
  account: string;
  implementation: string;
  chainId: BigNumberish;
  tokenContract: string;
  tokenId: BigNumberish;
  salt: BigNumberish;
}
export interface ERC6551Registry {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param implementation Type: address, Indexed: false
   * @param chainId Type: uint256, Indexed: false
   * @param tokenContract Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param salt Type: uint256, Indexed: false
   */
  account(
    implementation: string,
    chainId: BigNumberish,
    tokenContract: string,
    tokenId: BigNumberish,
    salt: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param implementation Type: address, Indexed: false
   * @param chainId Type: uint256, Indexed: false
   * @param tokenContract Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param salt Type: uint256, Indexed: false
   * @param initData Type: bytes, Indexed: false
   */
  createAccount(
    implementation: string,
    chainId: BigNumberish,
    tokenContract: string,
    tokenId: BigNumberish,
    salt: BigNumberish,
    initData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
