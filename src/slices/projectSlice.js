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
		0: "Ali",
		1: "Baha",
		2: "Can",
		3: "Derya",
		4: "Emel",
		5: "Fatma",
	},
	criterias: {
		0: { criteria: "İngilizce", weight: 20, type: "+" },
		1: { criteria: "Not Ort.", weight: 30, type: "+" },
		2: { criteria: "Üniv.", weight: 20, type: "+" },
		3: { criteria: "Tavsiye", weight: 10, type: "+" },
		4: { criteria: "Mülakat", weight: 20, type: "+" },
	},
	matrix: {
		0: { 0: 69, 1: 3.1, 2: 9, 3: 7, 4: 4 },
		1: { 0: 59, 1: 3.9, 2: 7, 3: 6, 4: 10 },
		2: { 0: 60, 1: 3.6, 2: 8, 3: 8, 4: 7 },
		3: { 0: 62, 1: 3.8, 2: 7, 3: 10, 4: 6 },
		4: { 0: 70, 1: 2.8, 2: 10, 3: 6, 4: 6 },
		5: { 0: 65, 1: 4, 2: 9, 3: 8, 4: 8 },
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
