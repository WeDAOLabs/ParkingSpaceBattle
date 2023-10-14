/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC1967Upgradeable,
  IERC1967UpgradeableInterface,
} from "../../../../@openzeppelin/contracts-upgradeable/interfaces/IERC1967Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
] as const;

export class IERC1967Upgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): IERC1967UpgradeableInterface {
    return new utils.Interface(_abi) as IERC1967UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC1967Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as IERC1967Upgradeable;
  }
}