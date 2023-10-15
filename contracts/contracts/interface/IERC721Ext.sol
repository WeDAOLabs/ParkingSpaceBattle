//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IERC721Ext {
    function safeMint(address to, uint256 tokenId) external;
}
