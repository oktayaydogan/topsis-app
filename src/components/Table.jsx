// components/Table.jsx

import React from "react";

const Table = ({ title, headers, data }) => {
	return (
		<div className="w-full border h-min rounded-lg overflow-hidden dark:border-gray-300">
			<table className="w-full min-w-max table-auto text-left">
				<caption className="bg-gray-100 p-4 font-bold">{title}</caption>
				<thead>
					<tr>
						{headers.map((header, index) => (
							<th
								key={index}
								className={
									headers.length === index + 1
										? "border-t border-gray-300 bg-gray-50 px-4 py-2 text-center"
										: "border-t border-e border-gray-300 bg-gray-50 px-4 py-2 text-center"
								}
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Object.keys(data).map((id) => (
						<tr key={id}>
							<th className="border-t border-e border-gray-300 bg-gray-50 px-4 py-2 text-center">
								{data[id].name}
							</th>
							{Object.keys(data[id].values).map((valueId) => (
								<td
									key={valueId}
									className={
										Object.keys(data[id].values).length ===
										parseInt(valueId) + 1
											? "border-t border-gray-300 px-4 py-2 text-center"
											: "border-t border-e border-gray-300 px-4 py-2 text-center"
									}
								>
									{data[id].values[valueId].toFixed(2)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
