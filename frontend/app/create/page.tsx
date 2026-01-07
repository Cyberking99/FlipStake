"use client"

import { useRouter } from "next/navigation"
import { GameHeader } from "@/components/game-header"
import { CreateGameForm } from "@/components/create-game-form"

export default function CreatePage() {
  const router = useRouter()

  const handleGameCreated = (id: string, stake: string) => {
    router.push(`/game/${id}`)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <GameHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <CreateGameForm onGameCreated={handleGameCreated} />
      </div>
    </main>
  )
}
