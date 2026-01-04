"use client"

import { useGameStore } from "@/lib/game-store"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Shield, Clock } from "lucide-react"

export function GameStatus() {
  const { currentGame, playerSelection } = useGameStore()

  if (!currentGame) return null

  return (
    <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="bg-card border-border">
        <CardContent className="pt-4 space-y-3">
          <div className="text-sm font-semibold text-foreground mb-3">Game Status</div>

          {/* Game State */}
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">State:</span>
            <span className="text-foreground font-medium capitalize">{currentGame.status}</span>
          </div>

          {/* Pot Amount */}
          <div className="flex items-center gap-2 text-sm">
            <Wallet className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">Pot:</span>
            <span className="text-accent font-semibold">{currentGame.potAmount} ETH</span>
          </div>

          {/* Player Selection */}
          {playerSelection && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Your Pick:</span>
              <span className="text-foreground font-medium capitalize">{playerSelection} Card</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
