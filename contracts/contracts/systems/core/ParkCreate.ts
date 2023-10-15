//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../../tokens/ParkERC721.sol";
import "../ERC6551/LotLootERC6551Account.sol";
import "../ERC6551/LotLootERC6551Registry.sol";

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ParkCreate is
    Initializable,
    PausableUpgradeable,
    AccessControlUpgradeable
{
    ParkERC721 public parkERC721;
    LotLootERC6551Registry public lotLootERC6551Registry;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint MAX_PARK_AMOUNT = 5;
    mapping(address => uint) parkAmount;

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _parkERC721,
        address _lotLootERC6551Registry
    ) public initializer {
        parkERC721 = ParkERC721(_parkERC721);
        lotLootERC6551Registry = LotLootERC6551Registry(
            _lotLootERC6551Registry
        );

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function addMinterRole(
        address _address
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, _address);
    }

    function addAdminRole(
        address _address
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ADMIN_ROLE, _address);
    }

    function setParkERC721(address _address) public onlyRole(ADMIN_ROLE) {
        parkERC721 = ParkERC721(_address);
    }

    function setLotLootERC6551Registry(
        address _address
    ) public onlyRole(ADMIN_ROLE) {
        lotLootERC6551Registry = LotLootERC6551Registry(_address);
    }

    function _mintPark(
        address _address,
        uint256 _tokenid
    ) internal onlyRole(MINTER_ROLE) {
        require(
            parkAmount[_address] < MAX_PARK_AMOUNT,
            "Maximum amount reached"
        );
        parkAmount[_address]++;
        parkERC721.safeMint(_address, _tokenid);
    }

    function mint(
        address _address,
        address _lotLootERC6551AccountAddress,
        uint256 _tokenId,
        uint256 _salt,
        bytes memory _initData
    ) public onlyRole(MINTER_ROLE) returns (address) {
        _mintPark(_address, _tokenId);

        address parkAddress = lotLootERC6551Registry.createAccount(
            _lotLootERC6551AccountAddress,
            block.chainid,
            address(parkERC721),
            _tokenId,
            _salt,
            _initData
        );
        return parkAddress;
    }
}
