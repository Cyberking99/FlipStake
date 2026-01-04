"use client"

import { useState } from "react"

interface GameCardProps {
  position: "left" | "right"
  isSelected?: boolean
  onClick?: () => void
  disabled?: boolean
  revealed?: boolean
  isWinner?: boolean
}

export function GameCard({ position, isSelected, onClick, disabled, revealed, isWinner }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      disabled={disabled || isSelected}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-32 h-48 sm:w-40 sm:h-56 rounded-xl transition-all duration-300
        ${isSelected ? "cursor-default opacity-75" : "cursor-pointer"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${isHovered && !isSelected && !disabled ? "scale-105" : ""}
      `}
    >
      {/* Card Back (Unrevealed) */}
      {!revealed ? (
        <div
          className={`
            absolute inset-0 rounded-xl
            bg-gradient-to-br from-accent/20 to-accent/5
            border-2 border-accent
            flex items-center justify-center
            ${isHovered && !isSelected && !disabled ? "shadow-[0_0_30px_rgba(166,113,255,0.5)]" : "shadow-[0_0_15px_rgba(166,113,255,0.3)]"}
            transition-all duration-300
          `}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-2">?</div>
            <p className="text-xs text-muted-foreground">Mystery</p>
          </div>
        </div>
      ) : (
        /* Card Revealed */
        <div
          className={`
            absolute inset-0 rounded-xl
            flex items-center justify-center text-4xl
            font-bold
            ${
              isWinner
                ? "bg-gradient-to-br from-amber-500/30 to-amber-600/20 border-2 border-amber-500 shadow-[0_0_40px_rgba(217,119,6,0.5)]"
                : "bg-gradient-to-br from-slate-600/30 to-slate-700/20 border-2 border-slate-600 shadow-[0_0_20px_rgba(71,85,105,0.3)]"
            }
          `}
        >
          {isWinner ? "🎁" : "🔲"}
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && !revealed && (
        <div className="absolute -inset-2 rounded-xl border-2 border-accent animate-pulse pointer-events-none"></div>
      )}
    </button>
  )
}
