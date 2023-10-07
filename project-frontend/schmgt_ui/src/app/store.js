import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Reducer from "./Reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import SecurityReducer from "./SecurityReducer";
import studentSlice from "./studentSlice";
import staffSlice from "./staffSlice";
const initialState = {};

const rootreducer = combineReducers({
  student: Reducer,
  student: studentSlice,
  staff: staffSlice,
  security: SecurityReducer,
});
const Store = configureStore({
  reducer: rootreducer,
  initialState,
  middleware: [thunk, logger],
});
export default Store;
