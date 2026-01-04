// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./FlipStakeGame.sol";

contract FlipStakeFactory {
    address[] public games;

    event GameCreated(
        address indexed game,
        address indexed creator,
        uint256 stake
    );

    function createGame(
        bytes32 commitHash,
        uint256 stake,
        uint256 joinTimeout,
        uint256 revealTimeout
    ) external payable returns (address gameAddress) {
        require(msg.value == stake, "Incorrect stake");

        FlipStakeGame game = new BlindBoxGame{value: msg.value}(
            msg.sender,
            commitHash,
            stake,
            joinTimeout,
            revealTimeout
        );

        gameAddress = address(game);
        games.push(gameAddress);

        emit GameCreated(gameAddress, msg.sender, stake);
    }

    function allGames() external view returns (address[] memory) {
        return games;
    }
}
