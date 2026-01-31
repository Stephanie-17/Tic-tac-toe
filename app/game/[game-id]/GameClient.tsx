"use client";
import React from "react";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
interface GameClientProps {
	gameId: string;
	availableSide: "X" | "O";
}

const GameClient = ({ gameId, availableSide }: GameClientProps) => {
	const [showSide, setShowSide] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
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
			}

			setShowSide(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, [availableSide, gameId]);
	if (showSide)
		return (
	<aside className="flex justify-center items-center min-h-dvh">
		<div className="bg-[#f5007e]  rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
				<h1 className="text-white font-semibold text-2xl ">You are {availableSide}</h1>
			</div>
	</aside>
			
		);
	if (error)
		return (
	<aside className="flex justify-center items-center min-h-dvh">
		  <div className="bg-red-700 ounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
				<h1 className="text-white font-semibold text-2xl ">{error}</h1>
			</div>
	</aside>
			
		);

	return (
		<aside className="flex justify-center items-center min-h-dvh">
			<div className="bg-[#8A06C7]  rounded-lg w-82 flex justify-center items-center h-30 shadow-[0_4px_12px_#000]">
				<h2 className="text-white font-semibold text-2xl ">
					Game starts now 🎮
				</h2>
			</div>
		</aside>
	);
};

export default GameClient;
