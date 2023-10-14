// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LOOTLOTPARK is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    address NFTMinter;
    uint256 private _nextTokenId;
    mapping(address => uint256) private lastMinted;
    event Minted(address indexed to, uint256 tokenId);

    constructor(
        address initialOwner
    ) ERC721("LOOTLOTPARK", "LLP") Ownable(initialOwner) {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://lotloot.osairo.xyz/lotloot_parking_meta.json?tokenid=";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        lastMinted[to] = tokenId;
        emit Minted(to, tokenId);
    }

    function setNFTMinter(address _NFTMinter) public onlyOwner {
        NFTMinter = _NFTMinter;
    }

    function getNFTMinter() public view returns (address) {
        return NFTMinter;
    }

    // the gammer mint
    function NFTMinterMint(address to, string memory uri) public {
        require(msg.sender == NFTMinter, "Only NFTMinter can mint");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        lastMinted[to] = tokenId;
        emit Minted(to, tokenId);
    }

    function getLastTokenIdByAddress(
        address _address
    ) public view returns (uint256) {
        return lastMinted[_address];
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
