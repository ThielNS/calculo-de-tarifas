import { combineReducers } from 'redux';
import equipmentsReducer from './equipmentsReducer';
import modalReducer from './modalReducer';

const reducerApp = combineReducers({ equipmentsReducer, modalReducer });

export default reducerApp;