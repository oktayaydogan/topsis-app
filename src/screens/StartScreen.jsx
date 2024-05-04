import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjectName, setCurrentStep } from "../slices/projectSlice";
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../components/Logo";

const StartScreen = () => {
	const projectName = useSelector((state) => state.project.projectName);
	const dispatch = useDispatch();

	const handleSetProjectName = (name) => {
		dispatch(setProjectName(name));
	};

	const handleSetCurrentStep = () => {
		if (projectName === "") {
			alert("Proje adı boş bırakılamaz!", "error");
			return;
		}
		dispatch(setCurrentStep(1));
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSetCurrentStep();
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-10">
			<Logo />
			<div className="flex flex-col items-center justify-center">
				<Input
					placeholder="Proje Adı"
					value={projectName}
					onChange={(e) => handleSetProjectName(e.target.value)}
					onKeyDown={(e) => handleKeyPress(e)}
				/>
				<Button onClick={() => handleSetCurrentStep()}>Kaydet</Button>
			</div>
		</div>
	);
};

export default StartScreen;
