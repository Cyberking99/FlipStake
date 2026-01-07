"use client"

import { useParams } from "next/navigation"
import { GameHeader } from "@/components/game-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FLIP_STAKE_GAME_ABI } from "@/lib/contracts"
import { useJoinGame } from "@/hooks/useJoinGame"
import { useReadContract, useAccount } from "wagmi"
import { formatEther } from "viem"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function JoinGamePage() {
  const params = useParams()
  const router = useRouter()
  const gameId = params.gameId as string

  const { joinGame, isPending, isConfirmed } = useJoinGame()
  const { isConnected } = useAccount()

  // Read stake from contract
  const { data: stake, isLoading: isLoadingStake } = useReadContract({
    address: gameId as `0x${string}`,
    abi: FLIP_STAKE_GAME_ABI,
    functionName: "stake",
  })

  useEffect(() => {
    if (isConfirmed) {
      // Redirect to game page or show success
      // For now, reload to reflect state (or maybe we need a dedicated game view)
      console.log("Joined successfully")
    }
  }, [isConfirmed])

  const handleJoinGame = () => {
    if (stake) {
      joinGame(gameId, stake)
    }
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
                <span className="font-mono text-foreground font-semibold text-xs">{gameId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stake Amount</span>
                <span className="text-foreground font-semibold">
                  {isLoadingStake ? <Loader2 className="h-4 w-4 animate-spin" /> : stake ? `${formatEther(stake)} ETH` : "Unknown"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                <span className="text-muted-foreground">Total Pot</span>
                <span className="text-accent font-semibold">
                  {stake ? `${formatEther(stake * 2n)} ETH` : "..."}
                </span>
              </div>
            </div>

            <Button
              onClick={handleJoinGame}
              disabled={!stake || isPending || !isConnected}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Joining...</> : "Join Game"}
            </Button>
            {!isConnected && <p className="text-xs text-center text-destructive">Please connect your wallet first</p>}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
