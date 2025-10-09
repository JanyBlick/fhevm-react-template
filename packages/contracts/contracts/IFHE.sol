// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IFHE
 * @dev Interface for FHE operations (mock for demonstration)
 */
interface IFHE {
    // Encrypted types
    type euint8 is uint256;
    type euint16 is uint256;
    type euint32 is uint256;
    type euint64 is uint256;
    type ebool is uint256;

    // Encryption functions (to be implemented by FHE library)
    function asEuint8(uint8 value) external pure returns (euint8);
    function asEuint16(uint16 value) external pure returns (euint16);
    function asEuint32(uint32 value) external pure returns (euint32);
    function asEuint64(uint64 value) external pure returns (euint64);
    function asEbool(bool value) external pure returns (ebool);

    // Arithmetic operations
    function add(euint32 a, euint32 b) external pure returns (euint32);
    function sub(euint32 a, euint32 b) external pure returns (euint32);
    function mul(euint32 a, euint32 b) external pure returns (euint32);

    // Comparison operations
    function eq(euint32 a, euint32 b) external pure returns (ebool);
    function ne(euint32 a, euint32 b) external pure returns (ebool);
    function lt(euint32 a, euint32 b) external pure returns (ebool);
    function lte(euint32 a, euint32 b) external pure returns (ebool);
    function gt(euint32 a, euint32 b) external pure returns (ebool);
    function gte(euint32 a, euint32 b) external pure returns (ebool);

    // Decryption (requires permission)
    function decrypt(euint32 value) external view returns (uint32);
}
