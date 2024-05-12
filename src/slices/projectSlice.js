// slices/projectSlice.js

import { createSlice } from "@reduxjs/toolkit";

import StartScreen from "../screens/StartScreen";
import AlternativeScreen from "../screens/AlternativeScreen";
import CriteriaScreen from "../screens/CriteriaScreen";
import ResultScreen from "../screens/ResultScreen";
import ValuesScreen from "../screens/ValuesScreen";

const initialState = {
	projectName: "",
	currentStep: 0,
	screens: [
		{
			name: "Proje Adı",
			visible: true,
			component: StartScreen,
			completed: true,
		},
		{
			name: "Alternatifler",
			visible: false,
			component: AlternativeScreen,
			completed: true,
		},
		{
			name: "Kriterler",
			visible: false,
			component: CriteriaScreen,
			completed: true,
		},
		{
			name: "Değerler",
			visible: false,
			component: ValuesScreen,
			completed: true,
		},
		{
			name: "Sonuçlar",
			visible: false,
			component: ResultScreen,
			completed: true,
		},
	],

	alternatives: {},
	criterias: {},
	matrix: {},
	/*
	alternatives: {
		0: "Promer",
		1: "Yüksek İnovasyon",
		2: "Prolojik",
		3: "Mertay",
		4: "3E Otomasyon",
		5: "Rovimek",
	},
	criterias: {
		0: { criteria: "Güvenlik", weight: 30, type: "+" },
		1: { criteria: "Destek ve Bakım Hizmetleri", weight: 19, type: "+" },
		2: { criteria: "Entegrasyon ve Uyum Yetenekleri", weight: 18, type: "+" },
		3: {
			criteria: "Referanslar ve Müşteri Geri Bildirimleri",
			weight: 14,
			type: "+",
		},
		4: { criteria: "Teknoloji ve Altyapı", weight: 19, type: "+" },
	},
	matrix: {
		0: { 0: 10, 1: 8, 2: 7, 3: 7, 4: 8 },
		1: { 0: 10, 1: 7, 2: 7, 3: 8, 4: 7 },
		2: { 0: 9, 1: 8, 2: 5, 3: 6, 4: 6 },
		3: { 0: 9, 1: 6, 2: 6, 3: 9, 4: 7 },
		4: { 0: 9, 1: 8, 2: 6, 3: 7, 4: 6 },
		5: { 0: 8, 1: 7, 2: 7, 3: 6, 4: 6 },
	},*/
};

const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setProjectName: (state, action) => {
			state.projectName = action.payload;
		},
		setScreenComplete: (state, action) => {
			state.screens[state.currentStep].completed = action.payload;
		},
		setCurrentStep: (state, action) => {
			state.currentStep = action.payload;
			state.screens.forEach((screen, index) => {
				state.screens[index].visible = index === action.payload;
			});
		},
		addAlternative: (state, action) => {
			const { id, name } = action.payload;
			state.alternatives[id] = name;
		},
		removeAlternative: (state, action) => {
			delete state.alternatives[action.payload];
		},
		addCriteria: (state, action) => {
			const { id, criteria, weight, type } = action.payload;
			state.criterias[id] = { criteria, weight, type };
		},
		removeCriteria: (state, action) => {
			delete state.criterias[action.payload];
		},
		setMatrix: (state, action) => {
			const { row, col, value } = action.payload;
			if (!state.matrix[row]) {
				state.matrix[row] = {};
			}
			state.matrix[row][col] = value;
		},
	},
});

export const {
	setProjectName,
	setScreenComplete,
	setCurrentStep,
	addAlternative,
	removeAlternative,
	addCriteria,
	removeCriteria,
	setMatrix,
} = projectSlice.actions;

export default projectSlice.reducer;
