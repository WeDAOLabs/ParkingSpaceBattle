/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  StandardERC6551Account,
  StandardERC6551AccountInterface,
} from "../../../../contracts/systems/ERC6551/StandardERC6551Account";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_size",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_end",
        type: "uint256",
      },
    ],
    name: "InvalidCodeAtRange",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "executeCall",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bytes4",
        name: "magicValue",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611477806100206000396000f3fe6080604052600436106100595760003560e01c806301ffc9a7146100655780631626ba7e146100a25780638da5cb5b146100df5780639e5d4c491461010a578063affed0e01461013a578063fc0c546a1461016557610060565b3661006057005b600080fd5b34801561007157600080fd5b5061008c60048036038101906100879190610a66565b610192565b6040516100999190610aae565b60405180910390f35b3480156100ae57600080fd5b506100c960048036038101906100c49190610c45565b610264565b6040516100d69190610cb0565b60405180910390f35b3480156100eb57600080fd5b506100f461029d565b6040516101019190610d0c565b60405180910390f35b610124600480360381019061011f9190610de9565b6103ae565b6040516101319190610edc565b60405180910390f35b34801561014657600080fd5b5061014f6104df565b60405161015c9190610f0d565b60405180910390f35b34801561017157600080fd5b5061017a610500565b60405161018993929190610f28565b60405180910390f35b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061025d57507f400a0398000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9050919050565b60008061027961027261029d565b8585610556565b9050801561029157631626ba7e60e01b915050610297565b60009150505b92915050565b6000806000803073ffffffffffffffffffffffffffffffffffffffff1663fc0c546a6040518163ffffffff1660e01b8152600401606060405180830381865afa1580156102ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103129190610f89565b92509250925046831461032b57600093505050506103ab565b8173ffffffffffffffffffffffffffffffffffffffff16636352211e826040518263ffffffff1660e01b81526004016103649190610f0d565b602060405180830381865afa158015610381573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a59190610fdc565b93505050505b90565b60606103b861029d565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610425576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041c90611066565b60405180910390fd5b60008573ffffffffffffffffffffffffffffffffffffffff1685858560405161044f9291906110b6565b60006040518083038185875af1925050503d806000811461048c576040519150601f19603f3d011682016040523d82523d6000602084013e610491565b606091505b508093508192505050806104a757815160208301fd5b6000806104b26105e5565b815260200190815260200160002060008154809291906104d1906110fe565b919050555050949350505050565b60008060006104ec6105e5565b815260200190815260200160002054905090565b6000806000803073ffffffffffffffffffffffffffffffffffffffff163b9050610537306060836105319190611146565b83610693565b80602001905181019061054a91906111b8565b93509350935050909192565b60008060006105658585610778565b915091506000600481111561057d5761057c61120b565b5b8160048111156105905761058f61120b565b5b1480156105c857508573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b806105da57506105d98686866107c9565b5b925050509392505050565b6000806000803073ffffffffffffffffffffffffffffffffffffffff1663fc0c546a6040518163ffffffff1660e01b8152600401606060405180830381865afa158015610636573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065a9190610f89565b925092509250828282604051602001610675939291906112a3565b60405160208183030381529060405280519060200120935050505090565b606060006106a08561090d565b9050600081036106c25760405180602001604052806000815250915050610771565b808411156106e25760405180602001604052806000815250915050610771565b8383101561072b578084846040517f2c4a89fa000000000000000000000000000000000000000000000000000000008152600401610722939291906112e0565b60405180910390fd5b60008484039050600085830390506000828210610748578261074a565b815b90506040519450601f19601f60208301011685016040528085528087602087018a3c505050505b9392505050565b60008060418351036107b95760008060006020860151925060408601519150606086015160001a90506107ad87828585610918565b945094505050506107c2565b60006002915091505b9250929050565b60008060008573ffffffffffffffffffffffffffffffffffffffff16631626ba7e60e01b8686604051602401610800929190611326565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161086a9190611387565b600060405180830381855afa9150503d80600081146108a5576040519150601f19603f3d011682016040523d82523d6000602084013e6108aa565b606091505b50915091508180156108be57506020815110155b80156109025750631626ba7e60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168180602001905181019061090091906113b3565b145b925050509392505050565b6000813b9050919050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c11156109535760006003915091506109f1565b60006001878787876040516000815260200160405260405161097894939291906113fc565b6020604051602081039080840390855afa15801561099a573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036109e8576000600192509250506109f1565b80600092509250505b94509492505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b610a4381610a0e565b8114610a4e57600080fd5b50565b600081359050610a6081610a3a565b92915050565b600060208284031215610a7c57610a7b610a04565b5b6000610a8a84828501610a51565b91505092915050565b60008115159050919050565b610aa881610a93565b82525050565b6000602082019050610ac36000830184610a9f565b92915050565b6000819050919050565b610adc81610ac9565b8114610ae757600080fd5b50565b600081359050610af981610ad3565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610b5282610b09565b810181811067ffffffffffffffff82111715610b7157610b70610b1a565b5b80604052505050565b6000610b846109fa565b9050610b908282610b49565b919050565b600067ffffffffffffffff821115610bb057610baf610b1a565b5b610bb982610b09565b9050602081019050919050565b82818337600083830152505050565b6000610be8610be384610b95565b610b7a565b905082815260208101848484011115610c0457610c03610b04565b5b610c0f848285610bc6565b509392505050565b600082601f830112610c2c57610c2b610aff565b5b8135610c3c848260208601610bd5565b91505092915050565b60008060408385031215610c5c57610c5b610a04565b5b6000610c6a85828601610aea565b925050602083013567ffffffffffffffff811115610c8b57610c8a610a09565b5b610c9785828601610c17565b9150509250929050565b610caa81610a0e565b82525050565b6000602082019050610cc56000830184610ca1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610cf682610ccb565b9050919050565b610d0681610ceb565b82525050565b6000602082019050610d216000830184610cfd565b92915050565b610d3081610ceb565b8114610d3b57600080fd5b50565b600081359050610d4d81610d27565b92915050565b6000819050919050565b610d6681610d53565b8114610d7157600080fd5b50565b600081359050610d8381610d5d565b92915050565b600080fd5b600080fd5b60008083601f840112610da957610da8610aff565b5b8235905067ffffffffffffffff811115610dc657610dc5610d89565b5b602083019150836001820283011115610de257610de1610d8e565b5b9250929050565b60008060008060608587031215610e0357610e02610a04565b5b6000610e1187828801610d3e565b9450506020610e2287828801610d74565b935050604085013567ffffffffffffffff811115610e4357610e42610a09565b5b610e4f87828801610d93565b925092505092959194509250565b600081519050919050565b600082825260208201905092915050565b60005b83811015610e97578082015181840152602081019050610e7c565b60008484015250505050565b6000610eae82610e5d565b610eb88185610e68565b9350610ec8818560208601610e79565b610ed181610b09565b840191505092915050565b60006020820190508181036000830152610ef68184610ea3565b905092915050565b610f0781610d53565b82525050565b6000602082019050610f226000830184610efe565b92915050565b6000606082019050610f3d6000830186610efe565b610f4a6020830185610cfd565b610f576040830184610efe565b949350505050565b600081519050610f6e81610d5d565b92915050565b600081519050610f8381610d27565b92915050565b600080600060608486031215610fa257610fa1610a04565b5b6000610fb086828701610f5f565b9350506020610fc186828701610f74565b9250506040610fd286828701610f5f565b9150509250925092565b600060208284031215610ff257610ff1610a04565b5b600061100084828501610f74565b91505092915050565b600082825260208201905092915050565b7f4e6f7420746f6b656e206f776e65720000000000000000000000000000000000600082015250565b6000611050600f83611009565b915061105b8261101a565b602082019050919050565b6000602082019050818103600083015261107f81611043565b9050919050565b600081905092915050565b600061109d8385611086565b93506110aa838584610bc6565b82840190509392505050565b60006110c3828486611091565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061110982610d53565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361113b5761113a6110cf565b5b600182019050919050565b600061115182610d53565b915061115c83610d53565b9250828203905081811115611174576111736110cf565b5b92915050565b600061118582610ccb565b9050919050565b6111958161117a565b81146111a057600080fd5b50565b6000815190506111b28161118c565b92915050565b6000806000606084860312156111d1576111d0610a04565b5b60006111df86828701610f5f565b93505060206111f0868287016111a3565b925050604061120186828701610f5f565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000819050919050565b61125561125082610d53565b61123a565b82525050565b60008160601b9050919050565b60006112738261125b565b9050919050565b600061128582611268565b9050919050565b61129d61129882610ceb565b61127a565b82525050565b60006112af8286611244565b6020820191506112bf828561128c565b6014820191506112cf8284611244565b602082019150819050949350505050565b60006060820190506112f56000830186610efe565b6113026020830185610efe565b61130f6040830184610efe565b949350505050565b61132081610ac9565b82525050565b600060408201905061133b6000830185611317565b818103602083015261134d8184610ea3565b90509392505050565b600061136182610e5d565b61136b8185611086565b935061137b818560208601610e79565b80840191505092915050565b60006113938284611356565b915081905092915050565b6000815190506113ad81610ad3565b92915050565b6000602082840312156113c9576113c8610a04565b5b60006113d78482850161139e565b91505092915050565b600060ff82169050919050565b6113f6816113e0565b82525050565b60006080820190506114116000830187611317565b61141e60208301866113ed565b61142b6040830185611317565b6114386060830184611317565b9594505050505056fea264697066735822122012bfe0f4b7548823157e1454313acab84104d985f5cd57c1d24a6ba37538816264736f6c63430008140033";

type StandardERC6551AccountConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StandardERC6551AccountConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StandardERC6551Account__factory extends ContractFactory {
  constructor(...args: StandardERC6551AccountConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StandardERC6551Account> {
    return super.deploy(overrides || {}) as Promise<StandardERC6551Account>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StandardERC6551Account {
    return super.attach(address) as StandardERC6551Account;
  }
  override connect(signer: Signer): StandardERC6551Account__factory {
    return super.connect(signer) as StandardERC6551Account__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StandardERC6551AccountInterface {
    return new utils.Interface(_abi) as StandardERC6551AccountInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StandardERC6551Account {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as StandardERC6551Account;
  }
}