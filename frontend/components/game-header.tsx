import Link from "next/link";
import { WalletConnect } from "./wallet-connect";

export function GameHeader() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-lg">⚡</span>
          </div>
          <span className="text-xl font-bold text-foreground">FlipStake</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span className="text-muted-foreground">Base Network</span>
          </div>
          <WalletConnect size="sm" />
        </div>
      </div>
    </header>
  );
}
