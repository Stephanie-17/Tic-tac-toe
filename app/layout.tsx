import type { Metadata } from "next";
import { Montserrat, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const geistSans = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

const geistMono = Roboto_Condensed({
	variable: "--font-roboto",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Tic-Tac-Toe",
	description: "A fun game to play with your friends and family.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
			>
				<div className="fixed inset-0 -z-10 overflow-hidden">
					<div className="absolute w-75 h-75 md:w-100 md:h-100 rounded-full bg-pink-400/60 blur-[80px] top-10 left-5" />
					<div className="absolute w-100 h-100 md:w-125 md:h-125 rounded-full bg-purple-400/60 blur-[80px] bottom-10 right-10" />
					<div className="absolute w-87.5 h-87.5 md:112.5 md:h-112.5 rounded-full bg-pink-300/60 blur-[80px] top-1/2 left-3/4" />
				</div>
				<div className="relative z-10">{children}</div>
			</body>
		</html>
	);
}
