"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface GameClientProps {
  gameId: string;
  availableSide: "X" | "O";
}

// read savedSide from localStorage safely
const getSavedSide = (gameId: string, defaultSide: "X" | "O") => {
  if (typeof window === "undefined") return defaultSide;
  return (localStorage.getItem(`tic-tac-toe-${gameId}`) as "X" | "O" | null) ?? defaultSide;
};

const GameClient = ({ gameId, availableSide }: GameClientProps) => {
  const [playerSide, setPlayerSide] = useState<"X" | "O" | null>(
    getSavedSide(gameId, availableSide)
  );
  const [showSide, setShowSide] = useState(() => playerSide ? false : true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only save to localStorage or update Supabase if the side is not already saved
    const savedSide = localStorage.getItem(`tic-tac-toe-${gameId}`);
    if (!savedSide) {
      localStorage.setItem(`tic-tac-toe-${gameId}`, availableSide);

      const timer = setTimeout(async () => {
        const updates =
          availableSide === "X"
            ? { player_x: "player2", status: "playing" }
            : { player_o: "player2", status: "playing" };

        const { error } = await supabase
          .from("games")
          .update(updates)
          .eq("game_id", gameId);

        if (error) setError("Failed to join Game");

        setShowSide(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [availableSide, gameId]);

  if (error)
    return (
      <aside className="flex justify-center items-center min-h-dvh">
        <div className="bg-red-700 rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
          <h1 className="text-white font-semibold text-2xl">{error}</h1>
        </div>
      </aside>
    );

  if (showSide)
    return (
      <aside className="flex justify-center items-center min-h-dvh">
        <div className="bg-[#f5007e] rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
          <h1 className="text-white font-semibold text-2xl">
            You are {playerSide}
          </h1>
        </div>
      </aside>
    );

  return (
    <aside className="flex justify-center items-center min-h-dvh">
      <div className="bg-[#8A06C7] rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
        <h2 className="text-white font-semibold text-2xl">Game starts now 🎮</h2>
      </div>
    </aside>
  );
};


export default GameClient;
