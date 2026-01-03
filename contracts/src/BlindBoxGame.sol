// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract BlindBoxGame {
    enum State {
        CREATED,
        JOINED,
        CHOOSING,
        REVEALED,
        FINISHED
    }
    address public immutable playerA;
    address public playerB;

    uint256 public immutable stake;

    uint256 public immutable joinDeadline;
    uint256 public immutable revealDeadline;
}
