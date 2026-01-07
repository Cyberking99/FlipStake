import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { FLIP_STAKE_GAME_ABI } from "@/lib/contracts";

export function useGameActions() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const cancelGame = async (gameAddress: string) => {
        writeContract({
            address: gameAddress as `0x${string}`,
            abi: FLIP_STAKE_GAME_ABI,
            functionName: "cancel",
        });
    };

    const claimTimeout = async (gameAddress: string) => {
        writeContract({
            address: gameAddress as `0x${string}`,
            abi: FLIP_STAKE_GAME_ABI,
            functionName: "claimTimeout",
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    return {
        cancelGame,
        claimTimeout,
        isPending: isPending || isConfirming,
        isConfirmed,
        hash,
        error,
    };
}
