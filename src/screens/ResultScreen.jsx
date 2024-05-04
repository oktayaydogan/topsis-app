// ResultScreen.js

import React from "react";
import { useSelector } from "react-redux";
import Table from "../components/Table";

const ResultScreen = () => {
	const projectName = useSelector((state) => state.project.projectName);
	const alternatives = useSelector((state) => state.project.alternatives);
	const criterias = useSelector((state) => state.project.criterias);
	const matrix = useSelector((state) => state.project.matrix);

	const headers = [
		"Alternatifler",
		...Object.keys(criterias).map(
			(criteriaId) =>
				criterias[criteriaId].criteria +
				" (" +
				criterias[criteriaId].weight +
				"%)"
		),
	];

	const values = {};
	Object.keys(alternatives).forEach((alternativeId) => {
		values[alternativeId] = {
			name: alternatives[alternativeId],
			values: {},
		};

		Object.keys(criterias).forEach((criteriaId) => {
			values[alternativeId].values[criteriaId] =
				matrix[alternativeId][criteriaId];
		});
	});

	const sum = [];

	// Alternatiflerin karelerini hesapla
	const calculateSquares = () => {
		const squares = {};
		Object.keys(alternatives).forEach((alternativeId) => {
			squares[alternativeId] = {
				name: alternatives[alternativeId],
				values: {},
			};

			Object.keys(criterias).forEach((criteriaId) => {
				squares[alternativeId].values[criteriaId] =
					matrix[alternativeId][criteriaId] ** 2;
			});
		});

		// Karelerin toplamını hesapla
		Object.keys(criterias).forEach((criteriaId) => {
			sum[criteriaId] = Object.keys(alternatives).reduce(
				(acc, alternativeId) => {
					return acc + squares[alternativeId].values[criteriaId];
				},
				0
			);
		});

		// Karekökünü al
		Object.keys(criterias).forEach((criteriaId) => {
			sum[criteriaId] = Math.sqrt(sum[criteriaId]);
		});

		squares["sum"] = {
			name: "Toplam",
			values: sum,
		};

		return squares;
	};

	// Alternatiflerin sum satırına oranlarını hesapla
	const calculateRatios = () => {
		const ratios = {};
		Object.keys(alternatives).forEach((alternativeId) => {
			ratios[alternativeId] = {
				name: alternatives[alternativeId],
				values: {},
			};

			Object.keys(criterias).forEach((criteriaId) => {
				ratios[alternativeId].values[criteriaId] =
					matrix[alternativeId][criteriaId] / sum[criteriaId];
			});
		});
		return ratios;
	};

	// Oranların ağırlıklara bölünmüş hallerini hesapla
	const calculateWeightedRatios = () => {
		const weightedRatios = {};
		Object.keys(alternatives).forEach((alternativeId) => {
			weightedRatios[alternativeId] = {
				name: alternatives[alternativeId],
				values: {},
			};

			Object.keys(criterias).forEach((criteriaId) => {
				weightedRatios[alternativeId].values[criteriaId] =
					(matrix[alternativeId][criteriaId] / sum[criteriaId]) *
					(criterias[criteriaId].weight / 100);
			});
		});

		//ideal pozitif ve negatif değerlerin hesaplanması
		const idealPositive = {};
		const idealNegative = {};

		Object.keys(criterias).forEach((criteriaId) => {
			const criteriaValues = Object.keys(alternatives).map(
				(alternativeId) => weightedRatios[alternativeId].values[criteriaId]
			);
			idealPositive[criteriaId] = Math.max(...criteriaValues);
			idealNegative[criteriaId] = Math.min(...criteriaValues);
		});

		//ideal pozitif ve negatif değerlerin hesaplanması
		weightedRatios["idealPositive"] = {
			name: "İdeal Pozitif",
			values: idealPositive,
		};

		weightedRatios["idealNegative"] = {
			name: "İdeal Negatif",
			values: idealNegative,
		};

		return weightedRatios;
	};

	// =SQRT((I$20-I14)^2+(J$20-J14)^2+(K$20-K14)^2+(L$20-L14)^2+(M$20-M14)^2)

	// Öklid Pozitif ve Negatif Uzaklıklarını Hesapla
	const calculateEuclideanDistances = () => {
		const euclideanDistances = {};

		Object.keys(alternatives).forEach((alternativeId) => {
			const positiveDistance = Math.sqrt(
				Object.keys(criterias).reduce((acc, criteriaId) => {
					return (
						acc +
						(weightedRatios["idealPositive"].values[criteriaId] -
							weightedRatios[alternativeId].values[criteriaId]) **
							2
					);
				}, 0)
			);

			const negativeDistance = Math.sqrt(
				Object.keys(criterias).reduce((acc, criteriaId) => {
					return (
						acc +
						(weightedRatios["idealNegative"].values[criteriaId] -
							weightedRatios[alternativeId].values[criteriaId]) **
							2
					);
				}, 0)
			);

			euclideanDistances[alternativeId] = {
				name: alternatives[alternativeId],
				values: {
					positive: positiveDistance,
					negative: negativeDistance,
				},
			};
		});

		return euclideanDistances;
	};

	// Puan ve Sıralamayı Hesapla
	const calculateRanking = () => {
		const ranking = Object.keys(alternatives).map((alternativeId) => {
			const positiveDistance =
				euclideanDistances[alternativeId].values.positive;
			const negativeDistance =
				euclideanDistances[alternativeId].values.negative;

			const score = negativeDistance / (positiveDistance + negativeDistance);

			return {
				name: alternatives[alternativeId],
				values: {
					score: score,
				},
			};
		});

		// sort by score largest to smallest
		ranking.sort((a, b) => b.values.score - a.values.score);

		return ranking;
	};

	const squares = calculateSquares();
	const ratios = calculateRatios();
	const weightedRatios = calculateWeightedRatios();
	const euclideanDistances = calculateEuclideanDistances();
	const ranking = calculateRanking();

	console.log("ranking", ranking);

	return (
		<div className="flex flex-col justify-center w-full h-full my-40 gap-5">
			<div>
				<h1 className="text-3xl font-bold mb-6 text-center">Sonuçlar</h1>
				<h2 className="text-xl font-bold border-b pb-3">
					Proje Adı: {projectName}
				</h2>
			</div>

			<Table title={"Değerler"} headers={headers} data={values} />
			<Table
				title={"Değerlerin Kareleri Toplamının Karekökü"}
				headers={headers}
				data={squares}
			/>
			<Table
				title={"Normalize Edilmiş Değerler"}
				headers={headers}
				data={ratios}
			/>
			<Table
				title={"Ağırlıklandırılmış Değerler"}
				headers={headers}
				data={weightedRatios}
			/>
			<Table
				title={"Öklid Uzaklıkları"}
				headers={["Alternatifler", "Pozitif Uzaklık", "Negatif Uzaklık"]}
				data={euclideanDistances}
			/>
			<Table
				title={"Puan Hesaplaması ve Sıralama"}
				headers={["Alternatifler", "Puan"]}
				data={ranking}
			/>
		</div>
	);
};

export default ResultScreen;
