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
					? { player_x: "player2",status:"playing" }
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
		return <div>
			<h1>You are {availableSide}</h1>
		</div>;
	if (error)
		return <div>
			<h1>{error}</h1>
		</div>;

    return <div>Game starts now 🎮</div>;
};

export default GameClient;
