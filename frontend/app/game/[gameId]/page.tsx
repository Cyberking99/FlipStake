"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { GameHeader } from "@/components/game-header"
import { CardSelectionScreen } from "@/components/card-selection-screen"
import { RevealScreen } from "@/components/reveal-screen"
import { GameStatus } from "@/components/game-status"
import { useGameStore } from "@/lib/game-store"

type GamePhase = "selection" | "reveal" | "complete"

export default function GamePage() {
  const params = useParams()
  const gameId = params.gameId as string
  const { currentGame, selectCard } = useGameStore()
  const [gamePhase, setGamePhase] = useState<GamePhase>("selection")
  const [playerWon, setPlayerWon] = useState(false)

  const handleReveal = () => {
    setGamePhase("reveal")
    setPlayerWon(Math.random() > 0.5)
    setTimeout(() => setGamePhase("complete"), 3000)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <GameHeader />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {gamePhase === "selection" ? (
          <CardSelectionScreen onReveal={handleReveal} />
        ) : (
          <RevealScreen playerWon={playerWon} />
        )}
      </div>

      <GameStatus />
    </main>
  )
}
