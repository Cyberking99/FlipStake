import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { FLIP_STAKE_GAME_ABI } from "@/lib/contracts";
import { useState, useEffect } from "react";

export function useRevealGame(gameAddress: string) {
    const { data: hash, writeContract, isPending, error } = useWriteContract();
    const [canReveal, setCanReveal] = useState(false);
    const [secretData, setSecretData] = useState<{ salt: string; winningCard: 0 | 1 } | null>(null);

    useEffect(() => {
        if (!gameAddress) return;
        const stored = localStorage.getItem(`flipstake_game_${gameAddress}`);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSecretData(parsed);
                setCanReveal(true);
            } catch (e) {
                console.error("Failed to parse secret", e);
            }
        }
    }, [gameAddress]);

    const revealGame = async () => {
        if (!secretData) return;

        writeContract({
            address: gameAddress as `0x${string}`,
            abi: FLIP_STAKE_GAME_ABI,
            functionName: "reveal",
            args: [secretData.salt as `0x${string}`, secretData.winningCard],
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    return {
        revealGame,
        canReveal,
        isPending: isPending || isConfirming,
        isConfirmed,
        hash,
        error,
    };
}
