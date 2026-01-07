import { useGameData } from "@/hooks/useGameData";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatEther } from "viem";
import { Loader2 } from "lucide-react";

const STATE_LABELS = ["Created", "Joined", "Choosing", "Revealed", "Finished"];

export function GameRow({ gameAddress }: { gameAddress: string }) {
    const router = useRouter();
    const { gameState, stake, isLoading } = useGameData(gameAddress);

    if (isLoading) {
        return (
            <TableRow>
                <TableCell colSpan={4} className="text-center h-12">
                    <Loader2 className="h-4 w-4 animate-spin inline" />
                </TableCell>
            </TableRow>
        );
    }

    return (
        <TableRow>
            <TableCell className="font-mono text-xs">{gameAddress.slice(0, 6)}...{gameAddress.slice(-4)}</TableCell>
            <TableCell>{stake ? formatEther(stake) : "0"} ETH</TableCell>
            <TableCell>{(gameState !== undefined && STATE_LABELS[gameState]) ? STATE_LABELS[gameState] : "Unknown"}</TableCell>
            <TableCell className="text-right">
                <Button size="sm" variant="secondary" onClick={() => router.push(`/game/${gameAddress}`)}>
                    View
                </Button>
            </TableCell>
        </TableRow>
    );
}
