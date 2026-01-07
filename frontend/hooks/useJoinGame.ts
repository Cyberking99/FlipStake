import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { FLIP_STAKE_GAME_ABI } from "@/lib/contracts";

export function useJoinGame() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const joinGame = async (gameAddress: string, stakeAmount: bigint) => {
        writeContract({
            address: gameAddress as `0x${string}`,
            abi: FLIP_STAKE_GAME_ABI,
            functionName: "join",
            value: stakeAmount,
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    return {
        joinGame,
        isPending: isPending || isConfirming,
        isConfirmed,
        hash,
        error,
    };
}
