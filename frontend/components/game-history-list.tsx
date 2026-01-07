import { useGameHistory } from "@/hooks/useGameHistory";
import { GameRow } from "@/components/game-row";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function GameHistoryList() {
    const { games, isLoading } = useGameHistory();

    return (
        <Card className="w-full max-w-4xl mt-8">
            <CardHeader>
                <CardTitle>Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                ) : games && games.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Game ID</TableHead>
                                <TableHead>Stake</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {games.slice(0, 10).map((game) => (
                                <GameRow key={game} gameAddress={game} />
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-center text-muted-foreground p-4">No games found.</p>
                )}
            </CardContent>
        </Card>
    );
}
