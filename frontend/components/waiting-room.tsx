"use client"

import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Loader2 } from "lucide-react"

interface WaitingRoomProps {
  gameId: string
  stakeAmount: string
  playerAddress?: string
}

export function WaitingRoom({ gameId, stakeAmount, playerAddress = "0x742d...8d0b" }: WaitingRoomProps) {
  const [copied, setCopied] = useState(false)
  const [isWaiting, setIsWaiting] = useState(true)

  const gameLink = `${typeof window !== "undefined" ? window.location.origin : ""}/join/${gameId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(gameLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Simulate opponent joining
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="bg-card border-border w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-foreground">Game Created</CardTitle>
        <CardDescription>Share the link and wait for your opponent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Game ID Display */}
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs font-semibold">GAME ID</Label>
          <div className="p-3 bg-secondary rounded-lg border border-border font-mono text-sm text-foreground">
            {gameId}
          </div>
        </div>

        {/* Game Details */}
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Address</span>
            <span className="font-mono text-foreground">{playerAddress}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Stake</span>
            <span className="text-foreground font-semibold">{stakeAmount} ETH</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pot</span>
            <span className="text-accent font-semibold">{(Number.parseFloat(stakeAmount) * 2).toFixed(2)} ETH</span>
          </div>
        </div>

        {/* Share Link */}
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs font-semibold">INVITE LINK</Label>
          <div className="flex gap-2">
            <input
              type="text"
              value={gameLink}
              readOnly
              className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm text-muted-foreground"
            />
            <Button size="sm" variant="outline" onClick={handleCopyLink} className="border-border bg-transparent">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Status */}
        <div className="p-4 bg-secondary rounded-lg border border-border space-y-3">
          <div className="flex items-center gap-3">
            <Loader2 className={`w-4 h-4 text-accent ${isWaiting ? "animate-spin" : ""}`} />
            <span className="text-sm text-foreground">
              {isWaiting ? "Waiting for Player B to join..." : "Player B joined! Ready to play"}
            </span>
          </div>
          {!isWaiting && (
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Start Game</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
