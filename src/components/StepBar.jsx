// components/StepBar.jsx

import React from "react";
import { useSelector } from "react-redux";

const StepBar = () => {
	const screens = useSelector((state) => state.project.screens);
	const currentStep = useSelector((state) => state.project.currentStep);

	return (
		<section className="flex flex-col items-center justify-center fixed z-50 container mt-12">
			<ol className="bg-white items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse border rounded-full p-4 select-none">
				{screens.map((screen, index) =>
					index === currentStep ? (
						<li
							key={index}
							className="flex items-center text-emerald-800 dark:text-emerald-800 space-x-2.5 rtl:space-x-reverse"
						>
							<span className="flex items-center justify-center w-8 h-8 border border-emerald-800 rounded-full shrink-0 dark:border-emerald-800">
								{index + 1}
							</span>
							<span>
								<h3 className="font-medium leading-tight">{screen.name}</h3>
							</span>
						</li>
					) : (
						<li
							key={index}
							className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse"
						>
							<span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
								{index + 1}
							</span>
							<span>
								<h3 className="font-medium leading-tight">{screen.name}</h3>
							</span>
						</li>
					)
				)}
			</ol>
		</section>
	);
};

export default StepBar;
