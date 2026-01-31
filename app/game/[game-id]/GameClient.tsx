"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface GameClientProps {
	gameId: string;
	gameData: {
		game_id: string;
		player_x: string | null;
		player_o: string | null;
		status: string;
		// add other fields as needed
	};
}

const GameClient = ({ gameId, gameData }: GameClientProps) => {
	// Check localStorage first to see if user is already in this game
	const savedSide =
		typeof window !== "undefined"
			? (localStorage.getItem(`tic-tac-toe-${gameId}`) as "X" | "O" | null)
			: null;

	// Determine available side for NEW players
	const getAvailableSide = (): "X" | "O" | null => {
		if (!gameData.player_x) return "X";
		if (!gameData.player_o) return "O";
		return null;
	};

	const availableSide = getAvailableSide();

	// If user already has a saved side, they're a returning player
	const isReturningPlayer = !!savedSide;

	// If game is full AND user is not a returning player, show error
	const isGameFull = !availableSide && !isReturningPlayer;

	// Initialize player side: use saved side if returning, otherwise use available side
	const [playerSide] = useState<"X" | "O" | null>(
		savedSide || availableSide
	);

	const [showSide, setShowSide] = useState(!isReturningPlayer);
	const [error, setError] = useState<string | null>(null);
	const [gameStarted, setGameStarted] = useState(isReturningPlayer);

	useEffect(() => {
		// Only run the join logic for new players
		if (isReturningPlayer || !availableSide) return;

		// Save the new player's side
		localStorage.setItem(`tic-tac-toe-${gameId}`, availableSide);

		// Show their side for 5 seconds, then join the game
		const timer = setTimeout(async () => {
			const updates =
				availableSide === "X"
					? { player_x: "player2", status: "playing" }
					: { player_o: "player2", status: "playing" };

			const { error } = await supabase
				.from("games")
				.update(updates)
				.eq("game_id", gameId);

			if (error) {
				setError("Failed to join Game");
			} else {
				setShowSide(false);
				setGameStarted(true);
			}
		}, 5000);

		return () => clearTimeout(timer);
	}, [availableSide, gameId, isReturningPlayer]);

	// Game is full and user is NOT already a player
	

	// Error state
	if (error) {
		return (
			<aside className="flex justify-center items-center min-h-dvh">
				<div className="bg-red-700 rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
					<h1 className="text-white font-semibold text-2xl">{error}</h1>
				</div>
			</aside>
		);
	}

	// Showing player's side (new player only)
	if (showSide && playerSide) {
		return (
			<aside className="flex justify-center items-center min-h-dvh">
				<div className="bg-[#f5007e] rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
					<h1 className="text-white font-semibold text-2xl">
						You are {playerSide}
					</h1>
				</div>
			</aside>
		);
	}

	// Game ready state
	if (gameStarted) {
		return (
			<aside className="flex justify-center items-center min-h-dvh">
				<div className="bg-[#8A06C7] rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
					<h2 className="text-white font-semibold text-2xl">
						Game starts now 🎮 
					</h2>
				</div>
			</aside>
		);
	}

  if (isGameFull) {
		return (
			<div className="flex w-full flex-col items-center h-dvh justify-center overflow-x-hidden relative">
				<h1 className="text-5xl font-extrabold text-center drop-shadow-[0_0_2px_#8A06C7]">
					Game is full🥲
				</h1>
				<Link href={"/create-game"}>
					<button className="focus:outline-3 focus:outline-white w-44 md:w-50 h-12 rounded-3xl font-semibold text-white mt-4 hover:w-50 md:hover:w-56 transition-all duration-500 bg-[#f5007e] cursor-pointer">
						Create new Game
					</button>
				</Link>
			</div>
		);
	}
	// Loading state
	return (
		<aside className="flex justify-center items-center min-h-dvh">
			<div className="bg-gray-700 rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
				<h2 className="text-white font-semibold text-2xl">Loading...</h2>
			</div>
		</aside>
	);
};

export default GameClient;