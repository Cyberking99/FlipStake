"use client"

import { useState } from "react"
import { GameHeader } from "@/components/game-header"
import { CardSelectionScreen } from "@/components/card-selection-screen"
import { RevealScreen } from "@/components/reveal-screen"

type GamePhase = "selection" | "reveal"

export default function PlayPage() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("selection")

  const handleReveal = () => {
    setGamePhase("reveal")
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <GameHeader />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {gamePhase === "selection" ? <CardSelectionScreen onReveal={handleReveal} /> : <RevealScreen />}
      </div>
    </main>
  )
}
