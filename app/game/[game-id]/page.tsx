// when a user clicks join game, I want a popup to show which side they are on,
// to do this, I'll need a variable that'll save the side so that I can dynamically show it on the screen.
// Then  I'll design and work on the layout for displaying the playerSide popup, it will be a component on it's own so tnhat i can use it for the error as well.
// I think I'll pass props from here.. or should I do another query in the main component?, no cause it's a reusable component, how will I make it reusable for a user *pulls hair in frustration*
// then after a few seconds it disappears.. but what if the game can't be found?
// then a popup showing the error and then take the person back to the url they are coming from,
// if everything is successful, after showing a side, it'll start the game and player_x will go first...
// I'll need a state called showPlayerSide. thaat will use setTimeout to show the popup. and right after we'll save it in the db.
// if there is an error, I'll use a state called showError, to display errors only when there are errors..
// and if everything is going well and it's successful, I'll start the game
// 042cbe97
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
     	<div className="flex  w-full flex-col items-center h-dvh justify-center overflow-x-hidden relative">
			<h1 className="text-5xl font-extrabold text-center drop-shadow-[0_0_2px_#8A06C7]">404 <br/> Game Not Found :(</h1>
			<Link href={'/join-game'} >
			 <button className=" focus:outline-3 focus:outline-white w-44 md:w-50 h-12 rounded-3xl font-semibold text-white  mt-4 hover:w-50 md:hover:w-56 transition-all duration-500 bg-[#8A06C7] cursor-pointer">Join new Game</button>
			</Link>
		</div>)
	
	}

	let availableSide: "X" | "O" | null = null;

	if (!data.player_x) availableSide = "X";
	else if (!data.player_o) availableSide = "O";

	if (!availableSide) {
		return (<div className="flex  w-full flex-col items-center h-dvh justify-center overflow-x-hidden relative">
			<h1 className="text-5xl font-extrabold text-center drop-shadow-[0_0_2px_#8A06C7]">Game is full🥲</h1>
				<Link href={'/create-game'} >
			 <button className=" focus:outline-3 focus:outline-white w-44 md:w-50 h-12 rounded-3xl font-semibold text-white  mt-4 hover:w-50 md:hover:w-56 transition-all duration-500 bg-[#f5007e] cursor-pointer">Create new Game</button>
			</Link>
		</div>);
	}

	return (
  <GameClient 
   gameId={gameId} 
   availableSide={availableSide} 
  />
);
};

export default Game;
