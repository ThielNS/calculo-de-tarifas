import { combineReducers } from 'redux';
import equipmentsReducer from './equipmentsReducer';

const reducerApp = combineReducers({ equipmentsReducer });

export default reducerApp;