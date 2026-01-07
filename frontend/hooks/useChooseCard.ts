import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { FLIP_STAKE_GAME_ABI } from "@/lib/contracts";

export function useChooseCard() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const chooseCard = async (gameAddress: string, card: 0 | 1) => {
        writeContract({
            address: gameAddress as `0x${string}`,
            abi: FLIP_STAKE_GAME_ABI,
            functionName: "choose",
            args: [card],
        });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    return {
        chooseCard,
        isPending: isPending || isConfirming,
        isConfirmed,
        hash,
        error,
    };
}
