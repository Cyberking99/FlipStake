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

    uint8 public choiceA;
    uint8 public choiceB;

    bool public hasChosenA;
    bool public hasChosenB;

    State public state;

    event Joined(address indexed player);
    event CardChosen(address indexed player, uint8 card);
    event Revealed(address indexed winner);
    event Refunded(address indexed player);

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

    // ------------------------
    // JOIN
    // ------------------------
    function join() external payable {
        require(state == State.CREATED, "Game not joinable");
        require(block.timestamp <= joinDeadline, "Join timeout");
        require(msg.value == stake, "Incorrect stake");
        require(msg.sender != playerA, "Creator cannot join");

        playerB = msg.sender;
        state = State.JOINED;

        emit Joined(msg.sender);
    }

    // ------------------------
    // CHOOSE CARD
    // ------------------------
    function choose(uint8 card) external {
        require(
            state == State.JOINED || state == State.CHOOSING,
            "Wrong state"
        );
        require(card == 0 || card == 1, "Invalid card");

        if (msg.sender == playerA) {
            require(!hasChosenA, "Already chosen");
            choiceA = card;
            hasChosenA = true;
        } else {
            require(!hasChosenB, "Already chosen");
            choiceB = card;
            hasChosenB = true;
        }

        state = State.CHOOSING;

        emit CardChosen(msg.sender, card);
    }

    // ------------------------
    // REVEAL
    // ------------------------
    function reveal(bytes32 secret, uint8 winningCard) external {
        require(state == State.CHOOSING, "Not ready to reveal");
        require(hasChosenA && hasChosenB, "Both must choose");
        require(block.timestamp <= revealDeadline, "Reveal timeout");
        require(winningCard == 0 || winningCard == 1, "Invalid card");

        require(
            keccak256(abi.encodePacked(secret, winningCard)) == commitHash,
            "Invalid reveal"
        );

        address winner;

        if (choiceA == winningCard && choiceB != winningCard) {
            winner = playerA;
        } else if (choiceB == winningCard && choiceA != winningCard) {
            winner = playerB;
        } else {
            // Both chose same card → creator wins by default
            winner = playerA;
        }

        state = State.REVEALED;

        emit Revealed(winner);

        _payout(winner);
    }

    // ------------------------
    // INTERNAL
    // ------------------------
    function _payout(address winner) internal {
        state = State.FINISHED;
        (bool ok, ) = winner.call{value: address(this).balance}("");
        require(ok, "Payout failed");
    }

    function _refund(address player) internal {
        (bool ok, ) = player.call{value: address(this).balance}("");
        require(ok, "Refund failed");
        emit Refunded(player);
    }
}
