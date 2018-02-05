import { combineReducers } from "redux";
import equipmentsReducer from "./equipmentsReducer";
import modalReducer from "./modalReducer";
import { powerDistribuitorReducer } from "./powerDistribuitorReducer";
import getMonth from "./chooseMonthlyReducer";

const reducerApp = combineReducers({
  equipmentsReducer,
  modalReducer,
  powerDistribuitorReducer,
  getMonth
});

export default reducerApp;

