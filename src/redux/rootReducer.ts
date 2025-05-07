import { combineReducers } from "@reduxjs/toolkit";
import { reducer as toastReducer } from "./slices/toastSlice";

const rootReducer = combineReducers({
  toast: toastReducer,
});

export default rootReducer;
