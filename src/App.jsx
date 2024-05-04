// App.jsx

import React from "react";
import StepBar from "./components/StepBar";
import NavigationBar from "./components/NavigationBar";
import MainScreen from "./screens/MainScreen";

const App = () => {
	return (
		<div className="container mx-auto">
			<StepBar />
			<MainScreen />
			<NavigationBar />
		</div>
	);
};

export default App;
