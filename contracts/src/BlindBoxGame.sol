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

    bytes32 public immutable commitHash;

    State public state;

    constructor(
        address _playerA,
        bytes32 _commitHash,
        uint256 _stake,
        uint256 _joinTimeout,
        uint256 _revealTimeout
    ) payable {
        require(msg.value == _stake, "Stake not deposited");

        playerA = _playerA;
        commitHash = _commitHash;
        stake = _stake;

        joinDeadline = block.timestamp + _joinTimeout;
        revealDeadline = joinDeadline + _revealTimeout;

        state = State.CREATED;
    }
}
