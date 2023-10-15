//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../../tokens/CarERC721.sol";
import "../../tokens/ParkingERC721.sol";

contract LotLoot is
    Initializable,
    PausableUpgradeable,
    AccessControlEnumerableUpgradeable
{
    CarERC721 carContract;
    ParkingERC721 parkingContract;

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

    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function upgradeNFT(
        address _CarERC721,
        address _parkingERC721
    ) public onlyRole(UPGRADER_ROLE) {
        carContract = CarERC721(_CarERC721);
        parkingContract = ParkingERC721(_parkingERC721);
    }

    function parkCar(uint _carTokenId, uint _parkTokenId) public {
        require(cars[_carTokenId].parkTokenId == 0, "Car is already parked");
        require(parks[_parkTokenId].carTokenId == 0, "Park is already full");
        cars[_carTokenId] = carInfo(block.timestamp, _parkTokenId);
        parks[_parkTokenId] = parkInfo(block.timestamp, _carTokenId);
    }

    function unParkCar(uint _carTokenId) public {
        require(
            carContract.ownerOf(_carTokenId) == msg.sender,
            "Not owner of car"
        );
        require(cars[_carTokenId].parkTokenId != 0, "Car is not parked");

        _handleCarUnparked(_carTokenId);
        cars[_carTokenId].parkTokenId = 0;
        parks[cars[_carTokenId].parkTokenId].carTokenId = 0;
    }

    function fineCar(uint _carTokenId) public {
        require(
            carContract.ownerOf(_carTokenId) != msg.sender,
            "It is your car"
        );
        require(
            parkingContract.ownerOf(cars[_carTokenId].parkTokenId) ==
                msg.sender,
            "Not owner of park"
        );
        require(cars[_carTokenId].parkTokenId != 0, "Car is not parked");

        _handleFineCar(_carTokenId, cars[_carTokenId].parkTokenId);
        cars[_carTokenId].parkTokenId = 0;
        parks[cars[_carTokenId].parkTokenId].carTokenId = 0;
    }

    function viewCarOnPark(uint _carTokenId) public view returns (uint) {
        return cars[_carTokenId].parkTokenId;
    }

    function _handleFineCar(uint _carTokenId, uint _parkTokenId) internal {}

    function _handleCarUnparked(uint _carTokenId) internal {}
}
