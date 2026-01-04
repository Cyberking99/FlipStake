"use client"

import { useState } from "react"
import { GameCard } from "@/components/game-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface CardSelectionScreenProps {
  onReveal?: () => void
}

export function CardSelectionScreen({ onReveal }: CardSelectionScreenProps) {
  const [selectedCard, setSelectedCard] = useState<"left" | "right" | null>(null)
  const [isWaiting, setIsWaiting] = useState(false)

  const handleCardSelect = (card: "left" | "right") => {
    if (!selectedCard && !isWaiting) {
      setSelectedCard(card)
      setIsWaiting(true)
      // Simulate opponent selection
      setTimeout(() => {
        onReveal?.()
      }, 3000)
    }
  }

  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Instructions */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">Choose one card</h2>
        <p className="text-muted-foreground text-balance">One contains the mystery box. Pick wisely.</p>
      </div>

      {/* Cards Container */}
      <div className="flex justify-center gap-8 sm:gap-12 py-12">
        <GameCard
          position="left"
          isSelected={selectedCard === "left"}
          onClick={() => handleCardSelect("left")}
          disabled={isWaiting}
        />
        <GameCard
          position="right"
          isSelected={selectedCard === "right"}
          onClick={() => handleCardSelect("right")}
          disabled={isWaiting}
        />
      </div>

      {/* Status */}
      {selectedCard && isWaiting && (
        <Card className="bg-card border-border mx-auto w-full max-w-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3 py-4">
              <Loader2 className="w-5 h-5 text-accent animate-spin" />
              <span className="text-foreground font-medium">Waiting for opponent to choose...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Info */}
      {!selectedCard && (
        <Card className="bg-card border-border mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-sm text-foreground">Game Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Your Stake</span>
              <span className="text-foreground font-semibold">0.5 ETH</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Opponent Stake</span>
              <span className="text-foreground font-semibold">0.5 ETH</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-muted-foreground">Total Pot</span>
              <span className="text-accent font-semibold">1.0 ETH</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
