const Input = ({ value, onChange, onKeyDown, placeholder }) => {
	return (
		<input
			className="mt-4 p-2 border border-gray-300 rounded-md w-96"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	);
};

export default Input;
