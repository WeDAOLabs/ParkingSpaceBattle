//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../../interface/IERC721Ext.sol";
import "../../interface/IERC6551Account.sol";
import "../../interface/IERC6551Registry.sol";

contract CarCreate is
    Initializable,
    PausableUpgradeable,
    AccessControlEnumerableUpgradeable,
    UUPSUpgradeable
{
    CarERC721 carERC721;
    LotLootERC6551Account lotLootERC6551Account;
    LotLootERC6551Registry lotLootERC6551Registry;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint public carAmount;

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _carERC721,
        address _lotLootERC6551Registry
    ) public initializer {
        carERC721 = CarERC721(_carERC721);
        lotLootERC6551Registry = LotLootERC6551Registry(
            _lotLootERC6551Registry
        );
        __Pausable_init();
        __AccessControlEnumerable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
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

    function _mintCar(address _address, uint256 _tokenId) internal {
        carERC721.safeMint(_address, _tokenId);
    }

    function mint(
        address _address,
        address _lotLootERC6551Account,
        uint256 _tokenId,
        uint256 _salt,
        bytes memory _initData
    ) public onlyRole(MINTER_ROLE) returns (address) {
        _mintCar(_address, _tokenId);

        address carAddress = lotLootERC6551Registry.createAccount(
            _lotLootERC6551Account,
            block.chainid,
            address(carERC721),
            _tokenId,
            _salt,
            _initData
        );
        return carAddress;
    }
}
