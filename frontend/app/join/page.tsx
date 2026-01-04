"use client"

import { useState } from "react"
import { GameHeader } from "@/components/game-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GamePreview {
  id: string
  creator: string
  stake: string
}

export default function JoinPage() {
  const [gamePreview] = useState<GamePreview>({
    id: "ABC123XY",
    creator: "0x742d...8d0b",
    stake: "0.5",
  })

  const [isJoining, setIsJoining] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  const handleJoinGame = async () => {
    setIsJoining(true)
    setTimeout(() => {
      setHasJoined(true)
      setIsJoining(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <GameHeader />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <Card className="bg-card border-border w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-foreground">Join Game</CardTitle>
            <CardDescription>
              {hasJoined ? "You've joined! Waiting for opponent..." : "Review the game details and confirm"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Game Preview */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Game ID</span>
                <span className="font-mono text-foreground font-semibold">{gamePreview.id}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Creator</span>
                <span className="font-mono text-foreground">{gamePreview.creator}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                <span className="text-muted-foreground">Stake</span>
                <span className="text-accent font-semibold">{gamePreview.stake} ETH</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 bg-secondary rounded-lg border border-border text-sm text-muted-foreground">
              <p>
                You will need to stake <span className="text-accent font-semibold">{gamePreview.stake} ETH</span> to
                join this game. The winner takes the full pot.
              </p>
            </div>

            {/* Join Button */}
            {!hasJoined ? (
              <Button
                onClick={handleJoinGame}
                disabled={isJoining}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isJoining ? "Confirming..." : "Confirm & Join"}
              </Button>
            ) : (
              <div className="p-4 bg-secondary rounded-lg border border-border text-center">
                <p className="text-sm text-muted-foreground">Game joined successfully</p>
                <p className="text-sm text-foreground font-semibold mt-1">Waiting for opponent to be ready...</p>
              </div>
            )}

            <Button variant="outline" className="w-full border-border bg-transparent">
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
