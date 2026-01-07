export const FLIP_STAKE_FACTORY_ADDRESS = "0x4f911c1a124C202e462501dE7b1f3bd36DCC2DD9" as const;

export const FLIP_STAKE_FACTORY_ABI = [
    {
        "type": "function",
        "name": "allGames",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createGame",
        "inputs": [
            {
                "name": "commitHash",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "stake",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "joinTimeout",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "revealTimeout",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "gameAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "games",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "GameCreated",
        "inputs": [
            {
                "name": "game",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "creator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "stake",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
] as const;

export const FLIP_STAKE_GAME_ABI = [
    {
        "type": "function",
        "name": "join",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "choose",
        "inputs": [
            {
                "name": "card",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "reveal",
        "inputs": [
            {
                "name": "secret",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "winningCard",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "state",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "enum FlipStakeGame.State"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "Joined",
        "inputs": [
            {
                "name": "player",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "CardChosen",
        "inputs": [
            {
                "name": "player",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "card",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Revealed",
        "inputs": [
            {
                "name": "winner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    }
] as const;
