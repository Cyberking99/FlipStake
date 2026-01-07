// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/FlipStakeFactory.sol";
import "../src/FlipStakeGame.sol";

contract FlipStakeTest is Test {
    FlipStakeFactory public factory;
    FlipStakeGame public game;

    address public playerA = address(0x111);
    address public playerB = address(0x222);

    uint256 public stake = 1 ether;
    uint256 public joinTimeout = 1 hours;
    uint256 public revealTimeout = 1 hours;

    bytes32 public secret = keccak256("my_secret");
    uint8 public winningCard = 1;
    bytes32 public commitHash;

    function setUp() public {
        factory = new FlipStakeFactory();
        commitHash = keccak256(abi.encodePacked(secret, winningCard));
        vm.deal(playerA, 10 ether);
        vm.deal(playerB, 10 ether);
    }

    // ------------------------
    // Factory Tests
    // ------------------------

    function test_CreateGame() public {
        vm.prank(playerA);
        address gameAddr = factory.createGame{value: stake}(
            commitHash,
            stake,
            joinTimeout,
            revealTimeout
        );

        assertEq(factory.allGames().length, 1);
        assertEq(factory.allGames()[0], gameAddr);
        
        FlipStakeGame createdGame = FlipStakeGame(gameAddr);
        assertEq(createdGame.playerA(), playerA);
        assertEq(createdGame.stake(), stake);
        assertEq(uint(createdGame.state()), uint(FlipStakeGame.State.CREATED));
    }

    function test_CreateGameWithIncorrectStake() public {
        vm.prank(playerA);
        vm.expectRevert("Incorrect stake");
        factory.createGame{value: 0.5 ether}(
            commitHash,
            stake,
            joinTimeout,
            revealTimeout
        );
    }

    // ------------------------
    // Game Tests
    // ------------------------

    function _setupGame() internal returns (FlipStakeGame) {
        vm.prank(playerA);
        address gameAddr = factory.createGame{value: stake}(
            commitHash,
            stake,
            joinTimeout,
            revealTimeout
        );
        return FlipStakeGame(gameAddr);
    }

    function test_JoinGame() public {
        game = _setupGame();
        
        vm.prank(playerB);
        game.join{value: stake}();

        assertEq(game.playerB(), playerB);
        assertEq(uint(game.state()), uint(FlipStakeGame.State.JOINED));
    }

    function test_JoinGameAfterDeadline() public {
        game = _setupGame();
        
        skip(joinTimeout + 1);
        
        vm.prank(playerB);
        vm.expectRevert("Join timeout");
        game.join{value: stake}();
    }

    function test_JoinGameByCreator() public {
        game = _setupGame();
        
        vm.prank(playerA);
        vm.expectRevert("Creator cannot join");
        game.join{value: stake}();
    }

    function test_ChooseCard() public {
        game = _setupGame();
        vm.prank(playerB);
        game.join{value: stake}();

        vm.prank(playerA);
        game.choose(0);
        
        vm.prank(playerB);
        game.choose(1);

        assertTrue(game.hasChosenA());
        assertTrue(game.hasChosenB());
        assertEq(game.choiceA(), 0);
        assertEq(game.choiceB(), 1);
        assertEq(uint(game.state()), uint(FlipStakeGame.State.CHOOSING));
    }

    function test_ChooseInvalidCard() public {
        game = _setupGame();
        vm.prank(playerB);
        game.join{value: stake}();

        vm.prank(playerA);
        vm.expectRevert("Invalid card");
        game.choose(2);
    }

    function test_RevealPlayerAWins() public {
        game = _setupGame();
        vm.prank(playerB);
        game.join{value: stake}();

        vm.prank(playerA);
        game.choose(1); // winning card
        
        vm.prank(playerB);
        game.choose(0);

        uint256 balanceBefore = playerA.balance;
        
        game.reveal(secret, winningCard);

        assertEq(playerA.balance, balanceBefore + 2 ether);
        assertEq(uint(game.state()), uint(FlipStakeGame.State.FINISHED));
    }

    function test_RevealPlayerBWins() public {
        game = _setupGame();
        vm.prank(playerB);
        game.join{value: stake}();

        vm.prank(playerA);
        game.choose(0);
        
        vm.prank(playerB);
        game.choose(1); // winning card

        uint256 balanceBefore = playerB.balance;
        
        game.reveal(secret, winningCard);

        assertEq(playerB.balance, balanceBefore + 2 ether);
    }

    function test_RevealTiePlayerAWins() public {
        game = _setupGame();
        vm.prank(playerB);
        game.join{value: stake}();

        vm.prank(playerA);
        game.choose(1);
        
        vm.prank(playerB);
        game.choose(1);

        uint256 balanceBefore = playerA.balance;
        
        game.reveal(secret, winningCard);

        assertEq(playerA.balance, balanceBefore + 2 ether);
    }

    function test_RevealInvalidSecret() public {
        game = _setupGame();
        vm.prank(playerB);
        game.join{value: stake}();

        vm.prank(playerA);
        game.choose(1);
        vm.prank(playerB);
        game.choose(0);

        vm.expectRevert("Invalid reveal");
        game.reveal(keccak256("wrong_secret"), winningCard);
    }

    function test_RevealBeforeBothChoose() public {
        game = _setupGame();
        vm.prank(playerB);
        game.join{value: stake}();

        vm.prank(playerA);
        game.choose(1);

        vm.expectRevert("Both must choose");
        game.reveal(secret, winningCard);
    }

    receive() external payable {}
}
