//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "../../interface/IERC721Ext.sol";

import "../../tokens/LLTToken.sol";
import "../ERC6551/ERC6551Registry.sol";
import "../ERC6551/StandardERC6551Account.sol";

contract LotLoot is
    Initializable,
    PausableUpgradeable,
    AccessControlEnumerableUpgradeable,
    UUPSUpgradeable
{
    LLTToken lltToken;
    IERC721Ext carNFT;
    IERC721Ext parkingNFT;
    ERC6551Registry registry;
    StandardERC6551Account account;

    struct carInfo {
        uint startTime;
        uint parkTokenId;
    }
    struct parkInfo {
        uint startTime;
        uint carTokenId;
    }
    mapping(uint => carInfo) public cars;
    mapping(uint => parkInfo) public parks;

    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _lltToken,
        address _carNFT,
        address _parkingNFT,
        address _registry,
        address _account
    ) public initializer {
        lltToken = LLTToken(_lltToken);
        carNFT = IERC721Ext(_carNFT);
        parkingNFT = IERC721Ext(_parkingNFT);
        registry = ERC6551Registry(_registry);
        account = StandardERC6551Account(_account);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function upgradeNFT(
        address _carAddress,
        address _parkingAddress
    ) public onlyRole(UPGRADER_ROLE) {
        carNFT = IERC721Ext(_carAddress);
        parkingNFT = IERC721Ext(_parkingAddress);
    }

    function upgradeERC6551(
        address _registry,
        address _account
    ) public onlyRole(UPGRADER_ROLE) {
        registry = ERC6551Registry(_registry);
        account = StandardERC6551Account(_account);
    }

    function parkCar(uint _carTokenId, uint _parkTokenId) public {
        require(
            carNFT.ownerOf(_carTokenId) == msg.sender,
            "You are not the owner of the car"
        );
        require(
            parkingNFT.ownerOf(_parkTokenId) != msg.sender,
            "You can not parking your park"
        );
        require(cars[_carTokenId].parkTokenId == 0, "Car is already parked");
        require(parks[_parkTokenId].carTokenId == 0, "Park is already full");
        cars[_carTokenId] = carInfo(block.timestamp, _parkTokenId);
        parks[_parkTokenId] = parkInfo(block.timestamp, _carTokenId);
    }

    function unParkCar(uint _carTokenId) public {
        require(carNFT.ownerOf(_carTokenId) == msg.sender, "Not owner of car");
        require(cars[_carTokenId].parkTokenId != 0, "Car is not parked");

        _handleUnparkCar(_carTokenId);
        cars[_carTokenId].parkTokenId = 0;
        parks[cars[_carTokenId].parkTokenId].carTokenId = 0;
    }

    function fineCar(uint _carTokenId) public {
        require(cars[_carTokenId].parkTokenId != 0, "Car is not parked");
        require(carNFT.ownerOf(_carTokenId) != msg.sender, "It is your car");
        require(
            parkingNFT.ownerOf(cars[_carTokenId].parkTokenId) == msg.sender,
            "Not owner of park"
        );
        _handleFineCar(_carTokenId, cars[_carTokenId].parkTokenId);
        cars[_carTokenId].parkTokenId = 0;
        parks[cars[_carTokenId].parkTokenId].carTokenId = 0;
    }

    function viewCarOnPark(uint _carTokenId) public view returns (uint) {
        return cars[_carTokenId].parkTokenId;
    }

    function _handleFineCar(uint _carTokenId, uint _parkTokenId) internal {}

    function _handleUnparkCar(uint _carTokenId) internal {
        // address carAddress = registry.account(
        //     address(account),
        //     block.chainid,
        //     address(carNFT),
        //     _carTokenId,
        //     _carTokenId
        // );
        // uint256 mintAmount = block.timestamp - cars[_carTokenId].startTime;
        // if (mintAmount > 1 days) {
        //     mintAmount = 1 days;
        // }
        // lltToken.mint(carAddress, mintAmount);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(UPGRADER_ROLE) {}
}
