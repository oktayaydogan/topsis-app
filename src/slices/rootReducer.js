// rootReducer.js

import { combineReducers } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";

const rootReducer = combineReducers({
	project: projectReducer,
});

export default rootReducer;
