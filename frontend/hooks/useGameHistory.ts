import { useReadContract } from "wagmi";
import { FLIP_STAKE_FACTORY_ADDRESS, FLIP_STAKE_FACTORY_ABI } from "@/lib/contracts";

export function useGameHistory() {
    const { data: games, isLoading, refetch } = useReadContract({
        address: FLIP_STAKE_FACTORY_ADDRESS,
        abi: FLIP_STAKE_FACTORY_ABI,
        functionName: "allGames",
    });

    // Reverse to show latest first
    const reversedGames = games ? [...(games as string[])].reverse() : [];

    return {
        games: reversedGames,
        isLoading,
        refetch,
    };
}
