import { supabase } from "@/lib/supabase";
import GameClient from "./GameClient";
import Link from "next/link";

const Game = async ({ params }: { params: Promise<{ "game-id": string }> }) => {
	const { "game-id": gameId } = await params;

	const { data, error } = await supabase
		.from("games")
		.select()
		.eq("game_id", gameId)
		.single();

	if (error || !data) {
		return (
			<div className="flex w-full flex-col items-center h-dvh justify-center overflow-x-hidden relative">
				<h1 className="text-5xl font-extrabold text-center drop-shadow-[0_0_2px_#8A06C7]">
					404 <br /> Game Not Found :(
				</h1>
				<Link href={"/join-game"}>
					<button className="focus:outline-3 focus:outline-white w-44 md:w-50 h-12 rounded-3xl font-semibold text-white mt-4 hover:w-50 md:hover:w-56 transition-all duration-500 bg-[#8A06C7] cursor-pointer">
						Join new Game
					</button>
				</Link>
			</div>
		);
	}

	// Pass the game data to client component - let it handle the full game logic
	return <GameClient gameId={gameId} gameData={data} />;
};

export default Game;