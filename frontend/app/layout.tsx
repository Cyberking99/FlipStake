import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ContextProvider from "@/context";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlipStake - Web3 Card Wagering Game",
  description:
    "Two cards. One mystery box. Stake ETH. Pick a card. Winner takes all.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For Next.js 15+, await the headers
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`font-sans antialiased`}>
        <ContextProvider cookies={cookie}>
          {children}
          <Analytics />
        </ContextProvider>
      </body>
    </html>
  );
}
