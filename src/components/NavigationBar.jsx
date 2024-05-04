// components/NavigationBar.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep } from "../slices/projectSlice";

import NavButton from "./NavButton";

const NavigationBar = () => {
	const currentStep = useSelector((state) => state.project.currentStep);
	const screens = useSelector((state) => state.project.screens);

	const dispatch = useDispatch();

	const handleSetCurrentStep = (step) => {
		dispatch(setCurrentStep(step));
	};

	return (
		currentStep !== 0 && (
			<section className="flex flex-col items-center justify-center fixed bottom-5 z-50 container mt-12">
				<ol className="bg-white items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse border rounded-full p-4">
					{currentStep > 0 && (
						<NavButton
							type="prev"
							onClick={() => handleSetCurrentStep(currentStep - 1)}
						/>
					)}
					{currentStep > 0 &&
						currentStep < screens.length - 1 &&
						screens[currentStep].completed && (
							<li className="hidden sm:block select-none">
								<div className="w-1 h-1 bg-gray-500 rounded-full"></div>
							</li>
						)}

					{currentStep < screens.length - 1 &&
						screens[currentStep].completed && (
							<NavButton
								type="next"
								onClick={() => handleSetCurrentStep(currentStep + 1)}
							/>
						)}
				</ol>
			</section>
		)
	);
};

export default NavigationBar;
