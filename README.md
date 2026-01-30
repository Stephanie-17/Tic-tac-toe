# Multiplayer Tic-Tac-Toe (Next.js + Supabase)

A simple fullstack Tic Tac Toe game built with **Next.js** and **Supabase**.

This project was built as a learning challenge to practice fullstack concepts while actually building something fun and interactive.

---

## Tech Stack

- Next.js (App Router)
- React
- Supabase (Database & Auth)
- TypeScript
- Tailwind CSS

---

## Features

- Create a new game with a unique Game ID
- Pick a side (X or O)
- Share Game ID with another player
- Join an existing game using the Game ID
- Prevent joining full games
- Server Components + Client Components separation
- Supabase CRUD operations

---

## How It Works

1. Player 1 creates a game and selects a side
2. A unique Game ID is generated and saved to the database
3. Player 2 joins using the Game ID
4. The app checks:
   - If the game exists
   - If the game is still waiting for a player
5. Player 2 is assigned the remaining side
6. Game status updates to `playing`

---

## Environment Variables

Create a `.env.local` file in the root of the project:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

---

## Learning Goals

- Understand Supabase CRUD operations
- Work with async functions
- Handle client vs server components in Next.js
- Design better user flows and error handling

---

## Future Improvements

- Real-time gameplay
- Player authentication
- Better error handling
- Game board UI & win logic

---

Built while learning, experimenting, and breaking things on purpose 🚀

