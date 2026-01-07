"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateGame } from "@/hooks/useCreateGame"
import { cn } from "@/lib/utils"

interface CreateGameFormProps {
  onGameCreated?: (gameId: string, stake: string) => void
}

export function CreateGameForm({ onGameCreated }: CreateGameFormProps) {
  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedCard, setSelectedCard] = useState<"left" | "right">("left")

  const { createGame, isPending, isConfirmed, gameAddress } = useCreateGame()

  useEffect(() => {
    if (isConfirmed && gameAddress) {
      onGameCreated?.(gameAddress, stakeAmount)
    }
  }, [isConfirmed, gameAddress, onGameCreated, stakeAmount])

  const handleCreateGame = async () => {
    if (!stakeAmount || !selectedCard) return
    await createGame(stakeAmount, selectedCard === "left" ? 0 : 1)
  }

  return (
    <Card className="bg-card border-border w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-foreground">Create New Game</CardTitle>
        <CardDescription>Set your stake and invite an opponent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stake Input */}
        <div className="space-y-2">
          <Label htmlFor="stake" className="text-foreground">
            Stake Amount
          </Label>
          <div className="relative">
            <Input
              id="stake"
              type="number"
              placeholder="0.01"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground pl-4"
              step="0.001"
              min="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">ETH</span>
          </div>
        </div>

        {/* Card Selection */}
        <div className="space-y-2">
          <Label className="text-foreground">Choose Winning Card</Label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedCard("left")}
              className={cn(
                "cursor-pointer rounded-lg border-2 p-4 text-center transition-all",
                selectedCard === "left"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-muted hover:border-accent/50"
              )}
            >
              <div className="font-bold">LEFT</div>
            </div>
            <div
              onClick={() => setSelectedCard("right")}
              className={cn(
                "cursor-pointer rounded-lg border-2 p-4 text-center transition-all",
                selectedCard === "right"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-muted hover:border-accent/50"
              )}
            >
              <div className="font-bold">RIGHT</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            This choice is hidden until you reveal it.
          </p>
        </div>

        {/* Network Info */}
        <div className="p-3 bg-secondary rounded-lg border border-border space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network</span>
            <span className="text-sm font-semibold text-foreground">Base</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Potential Winnings</span>
            <span className="text-sm font-semibold text-accent">
              {stakeAmount ? (Number.parseFloat(stakeAmount) * 2).toFixed(2) : "0.00"} ETH
            </span>
          </div>
        </div>

        {/* Fairness Info */}
        <div className="p-3 bg-muted/30 rounded-lg border border-border text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Fair & Secure</p>
          <p>The winning card is hidden using cryptographic commit–reveal. No one can cheat or predict the outcome.</p>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreateGame}
          disabled={!stakeAmount || isPending}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isPending ? "Creating Game..." : "Create Game"}
        </Button>
      </CardContent>
    </Card>
  )
}
