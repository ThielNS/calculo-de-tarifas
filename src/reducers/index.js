import { combineReducers } from 'redux';
import equipmentsReducer from './equipmentsReducer';
import modalReducer from './modalReducer';
import { powerDistribuitorReducer } from './powerDistribuitorReducer';
import {calculateEquipmentsDistribuitor} from "./powerDistribuitorReducer"
import listMonthly from "./chooseMonthlyReducer";

const reducerApp = combineReducers({ equipmentsReducer, modalReducer, powerDistribuitorReducer, calculateEquipmentsDistribuitor, listMonthly });

export default reducerApp;