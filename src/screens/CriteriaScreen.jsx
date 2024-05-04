// CriteriaScreen.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addCriteria, setScreenComplete } from "../slices/projectSlice";

import Button from "../components/Button";
import Input from "../components/Input";

const CriteriaScreen = () => {
	const [criteria, setCriteria] = useState("");
	const [weight, setWeight] = useState(100);
	const [type, setType] = useState("+");

	const criterias = useSelector((state) => state.project.criterias);
	const dispatch = useDispatch();

	const min = 0.1;
	const max = 100;
	const step = 0.1;

	const handleAddCriteria = () => {
		if (!criteria || !weight) {
			alert("Kriter adı ve ağırlık boş bırakılamaz!", "error");
			return;
		}

		if (weight > max) setWeight(max);
		if (weight < min) setWeight(min);

		dispatch(
			addCriteria({
				id: Object.keys(criterias).length,
				criteria,
				weight,
				type,
			})
		);
		dispatch(setScreenComplete(true));
		setCriteria("");
		setWeight("100");
		setType("+");
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleAddCriteria();
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full border rounded-lg overflow-hidden dark:border-gray-300">
				<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							<th className="bg-gray-50 p-4">Kriterler</th>
							<th className="bg-gray-50 p-4">Ağırlık</th>
							<th className="bg-gray-50 p-4">Tip</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(criterias).map((id) => (
							<tr key={id}>
								<td className="border-t border-gray-300 px-4 py-2">
									{criterias[id].criteria}
								</td>
								<td className="border-t border-gray-300 px-4 py-2">
									{criterias[id].weight}
								</td>
								<td className="border-t border-gray-300 px-4 py-2">
									{criterias[id].type}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex gap-3">
				<Input
					placeholder="Kriter Adı"
					value={criteria}
					onChange={(e) => setCriteria(e.target.value)}
					onKeyDown={(e) => handleKeyPress(e)}
				/>
				<input
					className="mt-4 p-2 border border-gray-300 rounded-md"
					type="number"
					step={step}
					min={min}
					max={max}
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
				/>

				<select
					className="mt-4 p-2 border border-gray-300 rounded-md"
					onChange={(e) => setType(e.target.value)}
				>
					<option value="+">+</option>
					<option value="-">-</option>
				</select>
			</div>
			<Button onClick={() => handleAddCriteria()}>Ekle</Button>
		</div>
	);
};

export default CriteriaScreen;
