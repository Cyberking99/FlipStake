export interface GameTransaction {
  hash: string
  status: "pending" | "confirmed" | "failed"
  from: string
  value: string
  timestamp: number
}

// Simulated contract interaction utilities
export const contractUtils = {
  // Create a game on the smart contract
  createGame: async (stakeAmount: string): Promise<string> => {
    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return "0x" + Math.random().toString(16).slice(2)
  },

  // Join an existing game
  joinGame: async (gameId: string, stakeAmount: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return "0x" + Math.random().toString(16).slice(2)
  },

  // Submit card selection
  submitSelection: async (gameId: string, selectedCard: "left" | "right"): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return "0x" + Math.random().toString(16).slice(2)
  },

  // Reveal game outcome
  revealOutcome: async (gameId: string): Promise<{ winner: string; loser: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const isPlayerWinner = Math.random() > 0.5
    return {
      winner: isPlayerWinner ? "0x742d...8d0b" : "0xABCD...1234",
      loser: isPlayerWinner ? "0xABCD...1234" : "0x742d...8d0b",
    }
  },

  // Wait for transaction confirmation
  waitForConfirmation: async (txHash: string, maxWaitTime = 30000): Promise<boolean> => {
    const startTime = Date.now()
    while (Date.now() - startTime < maxWaitTime) {
      // Simulate checking transaction status
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (Math.random() > 0.7) return true
    }
    return false
  },
}
