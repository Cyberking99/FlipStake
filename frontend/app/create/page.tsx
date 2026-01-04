"use client"

import { useState } from "react"
import { GameHeader } from "@/components/game-header"
import { CreateGameForm } from "@/components/create-game-form"
import { WaitingRoom } from "@/components/waiting-room"

export default function CreatePage() {
  const [gameCreated, setGameCreated] = useState<{ id: string; stake: string } | null>(null)

  const handleGameCreated = (gameId: string) => {
    setGameCreated({ id: gameId, stake: "0.5" })
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <GameHeader />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        {gameCreated ? (
          <WaitingRoom gameId={gameCreated.id} stakeAmount={gameCreated.stake} />
        ) : (
          <CreateGameForm onGameCreated={handleGameCreated} />
        )}
      </div>
    </main>
  )
}
