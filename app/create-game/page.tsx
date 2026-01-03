"use client";
import { useState } from "react";
const CreateGame = () => {
	const [popUp, setPopUp] = useState(false);
  const [side, setSide] = useState<'X' | 'O' | null>(null)
  const [gameId, setGameId] = useState('')
	const generateGameId = () => {
    const id = crypto.randomUUID().slice(0, 8);
		setGameId(id)
	};
  
  const handleClick = (letter: 'X' | 'O') => {
    setSide(letter)
    generateGameId()
    setPopUp(true)
    console.log(side)
  }
	
	return (
		<section className="flex w-full flex-col items-center h-dvh justify-center overflow-x-hidden relative">
			<header className="flex items-center flex-col gap-2 mb-10">
				<h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold drop-shadow-[0_0_2px_#8A06C7] ">
					Pick A Side
				</h1>
			</header>
			<div className="flex gap-6 items-center">
				<button className="bg-[#F5007E] h-16 w-16 border-2 border-[#FF70BA] text-white text-3xl font-semibold" onClick={()=>handleClick('X')}>
					X
				</button>
				<p className="text-white text-3xl font-bold italic">OR</p>
				<button className="bg-[#F5007E] h-16 w-16 border-2 border-[#FF70BA] text-black text-3xl font-semibold" onClick={()=>handleClick('O')}>
					O
				</button>
			</div>

			{popUp && (
				<aside className={`absolute bottom-0 right-0 bg-black p-6 flex items-center flex-col gap-4 transition-transform duration-1000 ${!popUp? "translate-x-150" : ''}`}>
					<p className="text-white mt-6">
						Copy this game id and share with your opponent{" "}
					</p>
					<p>
						Game ID: <span className="font-bold">{gameId}</span>
					</p>
					<button
						className="text-red-600 text-xl font-semibold absolute right-4 top-2"
						onClick={() => setPopUp(false)}
					>
						X
					</button>
				</aside>
			)}
		</section>
	);
};

export default CreateGame;
