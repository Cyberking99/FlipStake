import { useReadContracts } from "wagmi";
import { FLIP_STAKE_GAME_ABI } from "@/lib/contracts";

export function useGameData(gameAddress: string) {
    const contract = {
        address: gameAddress as `0x${string}`,
        abi: FLIP_STAKE_GAME_ABI,
    };

    const { data, isLoading, refetch } = useReadContracts({
        contracts: [
            { ...contract, functionName: "state" },
            { ...contract, functionName: "playerA" },
            { ...contract, functionName: "playerB" },
            { ...contract, functionName: "stake" },
            { ...contract, functionName: "hasChosenA" },
            { ...contract, functionName: "hasChosenB" },
            { ...contract, functionName: "choiceA" },
            { ...contract, functionName: "choiceB" },
        ],
    });

    if (!data || isLoading) {
        return { isLoading: true, refetch };
    }

    return {
        isLoading: false,
        refetch,
        gameState: data[0].result as number,
        playerA: data[1].result as string,
        playerB: data[2].result as string,
        stake: data[3].result as bigint,
        hasChosenA: data[4].result as boolean,
        hasChosenB: data[5].result as boolean,
        choiceA: data[6].result as number,
        choiceB: data[7].result as number,
    };
}
