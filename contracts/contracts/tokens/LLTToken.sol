// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lootlot is ERC20, ERC20Burnable, Ownable {
    // 游戏合约地址 
    address gameAddress;
    constructor(address initialOwner)
        ERC20("lootlot", "LOT")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 1000000000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    function setGameAddress(address _gameAddress) public onlyOwner {
        gameAddress = _gameAddress;
    }
    function getGameAddress() public view returns (address) {
        return gameAddress;
    }
    function gameMint(address userAddress,uint256 amount) public {
        require(msg.sender == gameAddress, "Only Game can mint");
        _mint(userAddress, amount);
    }
    
}