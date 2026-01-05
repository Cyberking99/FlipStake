"use client";
import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type WalletConnectProps = {
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null;
};

export function WalletConnect({ size = "default" }: WalletConnectProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  if (isConnected && address) {
    const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={size}>
            {truncatedAddress}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => open()}>My Account</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect()}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button variant="outline" size={size} onClick={() => open()}>
      Connect Wallet
    </Button>
  );
}
