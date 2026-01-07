import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, keccak256, encodePacked, type Hex, parseEventLogs } from "viem";
import {
    FLIP_STAKE_FACTORY_ADDRESS,
    FLIP_STAKE_FACTORY_ABI,
} from "@/lib/contracts";
import { useEffect, useState } from "react";

export function useCreateGame() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();
    const [gameAddress, setGameAddress] = useState<string | null>(null);

    const {
        data: receipt,
        isLoading: isConfirming,
        isSuccess: isConfirmed,
    } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (receipt) {
            const logs = parseEventLogs({
                abi: FLIP_STAKE_FACTORY_ABI,
                eventName: "GameCreated",
                logs: receipt.logs,
            });

            if (logs.length > 0) {
                // logs[0].args.game is the address
                setGameAddress(logs[0].args.game);
            }
        }
    }, [receipt]);

    const createGame = async (stakeAmount: string, winningCard: 0 | 1) => {
        console.log("createGame called with:", { stakeAmount, winningCard });
        try {
            // 1. Generate random salt (32 bytes)
            const salt = crypto.getRandomValues(new Uint8Array(32));
            const saltHex = ("0x" +
                Array.from(salt)
                    .map((b) => b.toString(16).padStart(2, "0"))
                    .join("")) as Hex;

            // 2. Calculate commit hash
            // Solidity: keccak256(abi.encodePacked(secret, winningCard))
            const commitHash = keccak256(
                encodePacked(["bytes32", "uint8"], [saltHex, winningCard])
            );

            // 3. Send transaction
            // defaults: joinTimeout = 1 hour (3600s), revealTimeout = 24 hours (86400s)
            const joinTimeout = 3600n;
            const revealTimeout = 86400n;
            const amount = parseEther(stakeAmount);


            console.log("Calling writeContract with:", {
                address: FLIP_STAKE_FACTORY_ADDRESS,
                args: [commitHash, amount, joinTimeout, revealTimeout],
                value: amount,
            });

            writeContract(
                {
                    address: FLIP_STAKE_FACTORY_ADDRESS,
                    abi: FLIP_STAKE_FACTORY_ABI,
                    functionName: "createGame",
                    args: [commitHash, amount, joinTimeout, revealTimeout],
                    value: amount,
                },
                {
                    onSuccess: (txHash) => {
                        // Store secrets locally associated with the transaction hash
                        const secrets = {
                            salt: saltHex,
                            winningCard: winningCard,
                            timestamp: Date.now(),
                        };
                        localStorage.setItem(`flipstake_secret_${txHash}`, JSON.stringify(secrets));
                        localStorage.setItem("flipstake_latest_secret", JSON.stringify(secrets));
                    },
                    onError: (error) => {
                        console.error("writeContract error:", error);
                    },
                }
            );
        } catch (err) {
            console.error("Failed to prepare game creation", err);
        }
    };

    return {
        createGame,
        isPending: isPending || isConfirming,
        isConfirmed,
        hash,
        error,
        gameAddress,
    };
}
