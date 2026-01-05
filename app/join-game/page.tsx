'use client'
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const JoinPage = () => {
	const [gameIdInput, setGameIdInput] = useState("");
	const [foundGame, setFoundGame] = useState<true|false|null>(null);
	const handleSearch = async () => {
		const {error,data} = await supabase.from('games').select().eq('game_id',gameIdInput)
		if (!error) {
			setFoundGame(true);
			console.log(data)
		} else {
			setFoundGame(false);
			
		}
		
	};
	// after user inputs game id, the code will search the database for the game id and conditionally render 'found game' and the Join game button will light up. and then router.push to the game site (which will have the game id in the link)

	return (
		<section className="flex w-full flex-col items-center h-dvh justify-center overflow-x-hidden relative">
			<header className="flex items-center flex-col gap-2 mb-10">
				<h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold drop-shadow-[0_0_2px_#8A06C7] text-center">
					Input Game ID
				</h1>
			</header>
			<div className="flex flex-col items-center">
				<div className="flex max-sm:flex-col items-center max-sm:gap-2">
					<input
						className="w-64 bg-white h-10 p-2 text-black placeholder:italic"
						type="text"
						value={gameIdInput}
						onChange={(e) => setGameIdInput(e.target.value)}
						placeholder="eg.13408267"
					/>
					<button
						className="bg-[#f5007e] focus:outline-3 focus:outline-white w-34 md:w-40 h-10  font-semibold text-white cursor-pointer  hover:w-38 md:hover:w-44 transition-all duration-500"
						onClick={handleSearch}
					>
						Search
					</button>
				</div>
				<p className="text-black mt-4 text-center">
					{foundGame === null
						? null
						: foundGame ? <span>Found Game: <b>{gameIdInput}</b></span> : "Error: Unable to find game, check your id and try again"}
				</p>
				<button
					className={`focus:outline-3 focus:outline-white w-44 md:w-50 h-12 rounded-3xl font-semibold text-white  mt-4 cursor-not-allowed ${
						foundGame
							? "hover:w-50 md:hover:w-56 transition-all duration-500 bg-[#8A06C7] cursor-pointer"
							: "bg-gray-500 "
					}`}
				>
					Join Game
				</button>
			</div>
		</section>
	);
};

export default JoinPage;
