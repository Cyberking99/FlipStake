"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useGameData } from "@/hooks/useGameData";
import { useChooseCard } from "@/hooks/useChooseCard";
import { useRevealGame } from "@/hooks/useRevealGame";
import { GameHeader } from "@/components/game-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, Trophy } from "lucide-react";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GamePage() {
  const params = useParams();
  const gameId = params.gameId as string;
  const { address } = useAccount();

  const {
    isLoading,
    gameState,
    playerA,
    playerB,
    stake,
    hasChosenA,
    hasChosenB,
    refetch
  } = useGameData(gameId);

  const { chooseCard, isPending: isChoosing, isConfirmed: isChosen } = useChooseCard();
  const { revealGame, isPending: isRevealing, isConfirmed: isRevealed, canReveal } = useRevealGame(gameId);

  // Poll for updates
  useEffect(() => {
    const timer = setInterval(() => {
      refetch();
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(timer);
  }, [refetch]);

  useEffect(() => {
    if (isChosen) {
      toast.success("Choice submitted!");
      refetch();
    }
    if (isRevealed) {
      toast.success("Game Revealed!");
      refetch();
    }
  }, [isChosen, isRevealed, refetch]);


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  const isPlayerA = address && playerA && address.toLowerCase() === playerA.toLowerCase();
  const isPlayerB = address && playerB && address.toLowerCase() === playerB.toLowerCase();
  const isSpectator = !isPlayerA && !isPlayerB;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied to clipboard");
  };

  const renderStatus = () => {
    switch (gameState) {
      case 0: // CREATED
        return (
          <div className="text-center space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground mb-2">Waiting for opponent to join...</p>
              <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2">
                <Copy className="h-4 w-4" /> Share Game Link
              </Button>
            </div>
          </div>
        );
      case 1: // JOINED
      case 2: // CHOOSING
        if (hasChosenA && hasChosenB) {
          return (
            <div className="text-center space-y-4">
              <p className="text-xl font-bold text-accent">Both players have chosen!</p>
              {isPlayerA ? (
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <p className="mb-4">Time to reveal the winner.</p>
                  <Button
                    onClick={() => revealGame()}
                    disabled={isRevealing || !canReveal}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {isRevealing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Reveal Winner
                  </Button>
                  {!canReveal && <p className="text-xs text-destructive mt-2">Cannot find secret to reveal.</p>}
                </div>
              ) : (
                <p className="text-muted-foreground">Waiting for creator to reveal...</p>
              )}
            </div>
          )
        }

        // Selection State
        const hasUserChosen = isPlayerA ? hasChosenA : isPlayerB ? hasChosenB : false;

        if (isSpectator) {
          return <p className="text-center text-muted-foreground">Players are choosing their cards...</p>;
        }

        if (hasUserChosen) {
          return <p className="text-center text-muted-foreground">Waiting for opponent to choose...</p>;
        }

        return (
          <div className="space-y-4">
            <p className="text-center font-medium">
              {isPlayerA ? "Confirm your winning card:" : "Guess the winning card:"}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => chooseCard(gameId, 0)}
                disabled={isChoosing}
                variant="outline"
                className="h-32 text-xl hover:bg-accent hover:text-accent-foreground border-2"
              >
                Left
              </Button>
              <Button
                onClick={() => chooseCard(gameId, 1)}
                disabled={isChoosing}
                variant="outline"
                className="h-32 text-xl hover:bg-accent hover:text-accent-foreground border-2"
              >
                Right
              </Button>
            </div>
          </div>
        );

      case 3: // REVEALED
      case 4: // FINISHED
        return (
          <div className="text-center space-y-6 py-8">
            <div className="flex justify-center">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Game Over</h3>
              <p className="text-muted-foreground">The winner has been determined.</p>
            </div>
          </div>
        )
      default:
        return <p>Unknown state</p>;
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <GameHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle>Game Room</CardTitle>
            <CardDescription className="font-mono text-xs">{gameId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg font-medium">
              <span>Pot Size</span>
              <span className="text-accent">{stake ? formatEther(stake * 2n) : "0"} ETH</span>
            </div>

            {renderStatus()}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
