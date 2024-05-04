const Button = ({ children, onClick }) => {
	return (
		<button
			className="mt-4 p-2 bg-emerald-800 text-white rounded-md w-96 select-none"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
