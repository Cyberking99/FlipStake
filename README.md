# FlipStake

FlipStake is a 1v1 onchain PvP wagering game built on **Base**, where two players stake funds and choose between two hidden cards.  
Only one card contains the **mystery box** — the player who picks it wins the entire stake.

> Two cards. One prize. No second chances.

---

## 🧠 How It Works

1. **Player A creates a game**
   - Chooses a stake amount
   - Commits to a hidden winning card using a cryptographic hash

2. **Player B joins the game**
   - Matches the stake

3. **Both players pick a card**
   - Card `0` or `1`
   - Card contents remain hidden

4. **Reveal**
   - Player A reveals the secret
   - The contract verifies fairness
   - Winner receives the full pot

---

## ⚙️ Core Features

- 🔒 **Commit–Reveal Fairness**
- ⚡ **Fast & Low-Cost (Base L2)**
- 🧩 **Fully Onchain Logic**
- 🧑‍🤝‍🧑 **True 1v1 PvP**
- 💰 **Winner Takes All**

---

## 🔐 Fairness & Security

FlipStake uses a **commit–reveal scheme** to ensure fairness:

- The winning card is committed before the second player joins
- The result cannot be changed after commitment
- All verification happens onchain

```text
commit = keccak256(secret + winningCardIndex)
````

This prevents:

* Result manipulation
* Card switching
* Late randomness injection

---

## 🏗️ Architecture

```text
Frontend (Next.js)
    ↓
FlipStakeFactory.sol  → Game creation
    ↓
FlipStakeGame.sol     → Game logic & payouts
    ↓
Base (Ethereum L2)
```

---

## 📜 Smart Contracts

### `FlipStakeFactory.sol`

* Creates new games
* Tracks active and completed games

### `FlipStakeGame.sol`

* Manages player actions
* Handles commits, choices, reveals
* Distributes stakes

---

## 🧪 Game State Flow

```text
CREATED → JOINED → CHOOSING → REVEALED → FINISHED
```

---

## 🖥️ Frontend UX Flow

1. Create game (stake + secret generated locally)
2. Share game link
3. Choose a card (hidden)
4. Reveal animation
5. Instant payout

---

## 🧱 Built On

* **Base**
* Solidity
* Ethers.js / Viem
* Next.js
* Foundry / Hardhat

---

## 🚀 Future Extensions

* ⏱️ Timeouts & anti-stalling
* 🏆 Tournaments & leaderboards
* 🎁 NFT mystery boxes
* 🔄 Best-of-3 matches
* 🪙 ERC20 or USDC support
* 🤖 AI-driven matchmaking

---

## 🛡️ Disclaimer

FlipStake is a game of chance and risk.
Play responsibly.

---

## 📄 License

MIT
