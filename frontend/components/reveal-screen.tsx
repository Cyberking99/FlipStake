"use client"

import { useEffect, useState } from "react"
import { GameCard } from "@/components/game-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Zap } from "lucide-react"
import Link from "next/link"

interface RevealScreenProps {
  playerWon?: boolean
}

export function RevealScreen({ playerWon = Math.random() > 0.5 }: RevealScreenProps) {
  const [hasRevealed, setHasRevealed] = useState(false)
  const [revealProgress, setRevealProgress] = useState(0)

  // Trigger reveal animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setHasRevealed(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Simulate transaction confirmation
  useEffect(() => {
    if (hasRevealed) {
      const interval = setInterval(() => {
        setRevealProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 150)
      return () => clearInterval(interval)
    }
  }, [hasRevealed])

  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Result Announcement */}
      <div className="text-center space-y-4">
        {hasRevealed && (
          <>
            <div className={`flex items-center justify-center gap-2 ${playerWon ? "text-amber-500" : "text-red-500"}`}>
              {playerWon ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              <h2 className="text-3xl sm:text-4xl font-bold">{playerWon ? "You Won!" : "You Lost"}</h2>
            </div>
            <p className={`text-lg ${playerWon ? "text-amber-500/80" : "text-red-500/80"}`}>
              {playerWon
                ? "Congratulations! You picked the right card."
                : "Better luck next time. Your opponent had the mystery box."}
            </p>
          </>
        )}
      </div>

      {/* Cards Reveal Animation */}
      <div className="flex justify-center gap-8 sm:gap-12 py-12">
        <div className={`transform transition-all duration-1000 ${hasRevealed ? "scale-100" : "scale-90 opacity-0"}`}>
          <GameCard position="left" revealed={hasRevealed} isWinner={playerWon} disabled />
        </div>
        <div
          className={`transform transition-all duration-1000 delay-300 ${hasRevealed ? "scale-100" : "scale-90 opacity-0"}`}
        >
          <GameCard position="right" revealed={hasRevealed} isWinner={!playerWon} disabled />
        </div>
      </div>

      {/* Transaction Status & Results */}
      {hasRevealed && (
        <Card className="bg-card border-border mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-sm text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              Transaction Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress Bar */}
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${revealProgress}%` }}
              ></div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Your Stake</span>
                <span className="text-foreground font-semibold">0.5 ETH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Opponent Stake</span>
                <span className="text-foreground font-semibold">0.5 ETH</span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className={playerWon ? "text-amber-500 font-semibold" : "text-red-500 font-semibold"}>
                  {playerWon ? "You Received" : "Total Pot"}
                </span>
                <span className={`font-bold text-lg ${playerWon ? "text-amber-500" : "text-red-500"}`}>
                  {playerWon ? "1.0 ETH" : "0 ETH"}
                </span>
              </div>
            </div>

            {/* Status Message */}
            {revealProgress < 100 ? (
              <div className="p-3 bg-secondary rounded-lg text-center text-sm text-muted-foreground">
                Confirming on blockchain...
              </div>
            ) : (
              <div
                className={`p-3 rounded-lg text-center text-sm font-semibold ${playerWon ? "bg-amber-500/20 text-amber-500" : "bg-red-500/20 text-red-500"}`}
              >
                {playerWon ? "Winnings transferred!" : "Game complete"}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {revealProgress === 100 && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/">
            <Button variant="outline" className="border-border bg-transparent w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">Play Again</Button>
        </div>
      )}
    </div>
  )
}
