import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setMatrix,
	setScreenComplete,
	setCurrentStep,
} from "../slices/projectSlice";
import Button from "../components/Button";

const ValuesScreen = () => {
	const [values, setValues] = useState({});
	const projectName = useSelector((state) => state.project.projectName);
	const alternatives = useSelector((state) => state.project.alternatives);
	const criterias = useSelector((state) => state.project.criterias);
	const matrix = useSelector((state) => state.project.matrix);
	const dispatch = useDispatch();

	const min = 0.1;
	const max = 100;
	const step = 0.1;

	// Initialize values
	useEffect(() => {
		if (
			Object.keys(alternatives).length > 0 &&
			Object.keys(criterias).length > 0 &&
			Object.keys(matrix).length === 0
		) {
			const newValues = {};
			Object.keys(alternatives).forEach((alternativeId) => {
				newValues[alternativeId] = {};
				Object.keys(criterias).forEach((criteriaId) => {
					newValues[alternativeId][criteriaId] = "";
				});
			});
			setValues(newValues);
		}
	}, [alternatives, criterias]);

	const handleAddValue = (alternativeId, criteriaId, value) => {
		if (value === "") return;

		value = parseFloat(value);
		if (value > max) value = max;
		if (value < min) value = min;

		const newValues = { ...values };
		newValues[alternativeId][criteriaId] = value;
		setValues(newValues);
	};

	const handleSetMatrix = (values) => {
		Object.keys(values).forEach((alternativeId) => {
			Object.keys(values[alternativeId]).forEach((criteriaId) => {
				dispatch(
					setMatrix({
						row: alternativeId,
						col: criteriaId,
						value: values[alternativeId][criteriaId],
					})
				);
				dispatch(setScreenComplete(true));
				dispatch(setCurrentStep(4));
			});
		});
	};

	return (
		<div className="flex flex-col items-center justify-center my-40 gap-5">
			<div className="w-full border rounded-lg overflow-hidden dark:border-gray-300">
				<table className="w-full min-w-max table-auto text-left">
					<caption className="border-b bg-gray-100 p-4 font-bold">
						{projectName} Değerleri
					</caption>
					<thead>
						<tr>
							<th className="bg-gray-50 p-4 border-e border-gray-300">
								Alternatifler
							</th>
							{Object.keys(criterias).map((id) => (
								<td key={id} className="bg-gray-50 p-4 text-wrap w-20">
									{criterias[id].criteria} ({criterias[id].weight}%)
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						{Object.keys(alternatives).map((id) => (
							<tr key={id}>
								<th className="border-t border-e border-gray-300 bg-gray-50 px-4 py-2 text-center">
									{alternatives[id]}
								</th>
								{Object.keys(criterias).map((criteriaId) => (
									<td
										key={criteriaId}
										className="border-t border-gray-300 px-4 py-2 text-center"
									>
										<input
											type="number"
											className="w-30 p-2 border border-gray-300 rounded-lg"
											step={step}
											min={min}
											max={max}
											value={matrix[id] && matrix[id][criteriaId]}
											onChange={(e) =>
												handleAddValue(id, criteriaId, e.target.value)
											}
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Button onClick={() => handleSetMatrix(values)}>Analiz Yap</Button>
		</div>
	);
};

export default ValuesScreen;
