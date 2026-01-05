import Link from "next/link";

export default function Home() {
	

	return (
		<>
			<section className="flex w-full flex-col items-center h-dvh justify-center">
				<header className="flex items-center flex-col gap-2 mb-10">
					<h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold drop-shadow-[0_0_2px_#8A06C7] ">
						Tic-Tac-Toe
					</h1>
					<p className="font-semibold sm:text-lg md:text-xl text-center">
						A multiplayer game for{" "}
						<i className="font-bold">you and your friends!!!</i>
					</p>
				</header>

				<div className="flex gap-3">
					<Link href={"/create-game"}>
						{" "}
						<button className="bg-[#f5007e] focus:outline-3 focus:outline-white w-34 md:w-40 h-12 rounded-3xl  font-semibold text-white cursor-pointer  hover:w-38 md:hover:w-44 transition-all duration-500 ">
							Create Game
						</button>
					</Link>
					<Link href={"/join-game"}>
						<button className="bg-[#8A06C7] focus:outline-3 focus:outline-white w-34 md:w-40 h-12 rounded-3xl font-semibold text-white cursor-pointer  hover:w-38 md:hover:w-44 transition-all duration-500">
							Join Game
						</button>
					</Link>
				</div>
			</section>
		</>
	);
}
