// AlternativeScreen.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addAlternative, setScreenComplete } from "../slices/projectSlice";

import Button from "../components/Button";
import Input from "../components/Input";

const AlternativeScreen = () => {
	const [alternative, setAlternative] = useState("");
	const alternatives = useSelector((state) => state.project.alternatives);
	const dispatch = useDispatch();

	const handleAddAlternative = () => {
		if (!alternative) {
			alert("Alternatif adı boş bırakılamaz!", "error");
			return;
		}
		dispatch(
			addAlternative({
				id: Object.keys(alternatives).length,
				name: alternative,
			})
		);
		dispatch(setScreenComplete(true));
		setAlternative("");
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleAddAlternative();
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full border rounded-lg overflow-hidden dark:border-gray-300">
				<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							<th className="bg-gray-50 p-4">Alternatifler</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(alternatives).map((id) => (
							<tr key={id}>
								<td className="border-t border-gray-300 px-4 py-2">
									{alternatives[id]}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Input
				placeholder="Alternatif Adı"
				value={alternative}
				onChange={(e) => setAlternative(e.target.value)}
				onKeyDown={(e) => handleKeyPress(e)}
			/>
			<Button onClick={() => handleAddAlternative()}>Ekle</Button>
		</div>
	);
};

export default AlternativeScreen;
