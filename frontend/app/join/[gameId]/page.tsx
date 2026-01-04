"use client"

import { useParams } from "next/navigation"
import { GameHeader } from "@/components/game-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-store"

export default function JoinGamePage() {
  const params = useParams()
  const gameId = params.gameId as string
  const { joinGame } = useGameStore()

  const handleJoinGame = () => {
    joinGame(gameId, {
      address: "0x742d...8d0b",
      stake: 0.5,
    })
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <GameHeader />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <Card className="bg-card border-border w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-foreground">Join Game {gameId}</CardTitle>
            <CardDescription>Review game details before joining</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Game ID</span>
                <span className="font-mono text-foreground font-semibold">{gameId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stake Amount</span>
                <span className="text-foreground font-semibold">0.5 ETH</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                <span className="text-muted-foreground">Total Pot</span>
                <span className="text-accent font-semibold">1.0 ETH</span>
              </div>
            </div>

            <Button onClick={handleJoinGame} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Join Game
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
