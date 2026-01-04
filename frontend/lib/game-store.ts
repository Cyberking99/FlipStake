import { create } from "zustand"

interface Player {
  address: string
  stake: number
}

interface Game {
  id: string
  createdBy: Player
  joinedBy?: Player
  status: "created" | "joined" | "selecting" | "revealing" | "completed"
  winnerAddress?: string
  potAmount: number
}

interface GameStore {
  currentGame: Game | null
  playerSelection: "left" | "right" | null
  gameHistory: Game[]
  createGame: (gameId: string, player: Player) => void
  joinGame: (gameId: string, player: Player) => void
  selectCard: (card: "left" | "right") => void
  completeGame: (winnerAddress: string) => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  currentGame: null,
  playerSelection: null,
  gameHistory: [],

  createGame: (gameId: string, player: Player) =>
    set((state) => ({
      currentGame: {
        id: gameId,
        createdBy: player,
        status: "created",
        potAmount: player.stake * 2,
      },
      gameHistory: [...state.gameHistory],
    })),

  joinGame: (gameId: string, player: Player) =>
    set((state) => {
      if (!state.currentGame) return state
      return {
        currentGame: {
          ...state.currentGame,
          joinedBy: player,
          status: "joined",
        },
      }
    }),

  selectCard: (card: "left" | "right") =>
    set((state) => ({
      playerSelection: card,
      currentGame: state.currentGame ? { ...state.currentGame, status: "selecting" } : null,
    })),

  completeGame: (winnerAddress: string) =>
    set((state) => {
      const completedGame = state.currentGame
        ? {
            ...state.currentGame,
            status: "completed" as const,
            winnerAddress,
          }
        : null

      return {
        currentGame: completedGame,
        gameHistory: completedGame ? [...state.gameHistory, completedGame] : state.gameHistory,
      }
    }),

  resetGame: () =>
    set({
      currentGame: null,
      playerSelection: null,
    }),
}))
