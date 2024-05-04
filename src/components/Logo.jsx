const Logo = () => {
	return (
		<div className="logo rounded-xl overflow-hidden flex flex-row items-center justify-center bg-slate-100 border-collapse select-none">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				width={100}
				height={100}
				viewBox="0 0 512 512"
			>
				<path
					d="M0 0h512v512H0z"
					style={{
						fill: "#065f46",
						fillOpacity: 1,
						fillRule: "nonzero",
						stroke: "none",
					}}
				/>
				<path
					d="M93.778 452.813 270.453 56h76.485L170.316 452.813H93.778zm324.444-60.017c0-34.885-28.417-63.205-63.44-63.205-35.053 0-63.44 28.32-63.44 63.205 0 34.924 28.387 63.204 63.44 63.204 35.023 0 63.44-28.28 63.44-63.204z"
					style={{
						fill: "#fff",
						fillOpacity: 1,
					}}
				/>
			</svg>
			<span className="font-bold text-black-100 text-5xl text px-8 text-emerald-800">
				TOPSIS
			</span>
		</div>
	);
};

export default Logo;
