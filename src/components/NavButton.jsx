import React from "react";

const NavButton = ({ type, onClick, disabled = false }) => {
	return (
		<button
			className="flex items-center text-emerald-800 dark:text-emerald-800 space-x-2.5 rtl:space-x-reverse select-none"
			onClick={onClick}
			disabled={disabled}
		>
			{type === "prev" && (
				<>
					<span className="flex items-center justify-center w-8 h-8 border border-emerald-800 rounded-full shrink-0 dark:border-emerald-800">
						←
					</span>
					<span>
						<h3 className="font-medium leading-tight">Geri</h3>
					</span>
				</>
			)}

			{type === "next" && (
				<>
					<span>
						<h3 className="font-medium leading-tight">İleri</h3>
					</span>
					<span className="flex items-center justify-center w-8 h-8 border border-emerald-800 rounded-full shrink-0 dark:border-emerald-800">
						→
					</span>
				</>
			)}
		</button>
	);
};

export default NavButton;
