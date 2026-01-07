import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/wallet-connect";
import { GameHistoryList } from "@/components/game-history-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">
                ⚡
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">FlipStake</span>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance">
              Two Cards.
              <span
                className="block text-accent inline-block mt-2"
                style={{ textShadow: "0 0 40px rgba(166, 113, 255, 0.5)" }}
              >
                One Mystery Box.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-xl mx-auto">
              Stake. Pick a card. Winner takes all.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/create">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Create Game
              </Button>
            </Link>
            <Link href="/join">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-accent"
              >
                Join Game
              </Button>
            </Link>
          </div>

          <div className="w-full flex justify-center mt-12 mb-8">
            <GameHistoryList />
          </div>

          {/* Info Section */}
          <div className="pt-12 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2 border-r-accent border-r-2">
                <div className="text-sm font-semibold text-accent">FAIR</div>
                <p className="text-sm text-muted-foreground">
                  Cryptographic commit-reveal ensures fairness
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-accent">FAST</div>
                <p className="text-sm text-muted-foreground">
                  Built on Base for lightning-quick transactions
                </p>
              </div>
              <div className="space-y-2 border-l-accent border-l-2">
                <div className="text-sm font-semibold text-accent">FINAL</div>
                <p className="text-sm text-muted-foreground">
                  Smart contracts guarantee winner takes all
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>FlipStake - Web3 Card Wagering on Base</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
