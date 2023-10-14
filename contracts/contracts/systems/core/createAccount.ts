// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../../tokens/CarERC721.sol";
import "../../tokens/ParkERC721.sol";
import "../../tokens/LLTToken.sol";
import "../ERC6551/ERC6551Registry.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract createAccount is Ownable {
    LOOTLOTCAR carERC721;
    LOOTLOTPARK parkERC721;
    Lootlot lltToken;
    ERC6551Registry erc6551Registry;

    uint MAX_PARK = 5;
    mapping(address => uint) public parkCount;

    constructor(
        address _carERC721,
        address _parkERC721,
        address _lltToken,
        address _erc6551Registry,
        address _initialOwner
    ) Ownable(_initialOwner) {
        carERC721 = LOOTLOTCAR(_carERC721);
        parkERC721 = LOOTLOTPARK(_parkERC721);
        lltToken = Lootlot(_lltToken);
        erc6551Registry = ERC6551Registry(_erc6551Registry);
    }

    function _createCar(address to, string memory uri) private {
        carERC721.NFTMinterMint(to, uri);
    }

    function _createPark(address to, string memory uri) private {
        require(parkCount[to] < MAX_PARK, "Max park reached");
        parkERC721.NFTMinterMint(to, uri);
        parkCount[to] += 1;
    }

    function createPark(address to, string memory uri) public {
        _createPark(to, uri);
        erc6551Registry.createAccount(
            address(this),
            1,
            address(parkERC721),
            parkERC721.getLastTokenIdByAddress(to),
            0,
            ""
        );
    }

    function createCar(address to, string memory uri) public {
        _createCar(to, uri);
        erc6551Registry.createAccount(
            address(this),
            1,
            address(carERC721),
            carERC721.tokenOfOwnerByIndex(to, 0),
            0,
            ""
        );
    }
}
