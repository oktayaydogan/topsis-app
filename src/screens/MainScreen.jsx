// screens/MainScreen.jsx
import React from "react";
import { useSelector } from "react-redux";

const MainScreen = () => {
	const screens = useSelector((state) => state.project.screens);

	return (
		<section className="flex items-center justify-center gap-10 min-h-screen">
			{screens.map(
				(screen, index) =>
					screen.visible && (
						<div key={index}>{React.createElement(screen.component)}</div>
					)
			)}
		</section>
	);
};

export default MainScreen;
