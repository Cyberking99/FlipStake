"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateGameFormProps {
  onGameCreated?: (gameId: string) => void
}

export function CreateGameForm({ onGameCreated }: CreateGameFormProps) {
  const [stakeAmount, setStakeAmount] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateGame = async () => {
    setIsCreating(true)
    // Simulate game creation
    setTimeout(() => {
      const gameId = Math.random().toString(36).substring(2, 9).toUpperCase()
      onGameCreated?.(gameId)
      setIsCreating(false)
    }, 1500)
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
              placeholder="0.5"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground pl-4"
              step="0.01"
              min="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">ETH</span>
          </div>
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
          disabled={!stakeAmount || isCreating}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isCreating ? "Creating Game..." : "Create Game"}
        </Button>
      </CardContent>
    </Card>
  )
}
