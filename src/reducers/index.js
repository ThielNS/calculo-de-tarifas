import { combineReducers } from 'redux';
import equipmentsReducer from './equipmentsReducer';
import modalReducer from './modalReducer';
import { powerDistribuitorReducer } from './powerDistribuitorReducer';
import {calculateEquipmentsDistribuitor} from "./powerDistribuitorReducer"

const reducerApp = combineReducers({ equipmentsReducer, modalReducer, powerDistribuitorReducer, calculateEquipmentsDistribuitor });

export default reducerApp;