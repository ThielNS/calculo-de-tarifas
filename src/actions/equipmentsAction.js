
import { ADD_EQUIPMENT, LIST_EQUIPMENTS, REMOVE_EQUIPMENTS } from "../reducers/equipmentsReducer/constants";

export const listEquipments = () => dispatch => {
  return dispatch({ type: LIST_EQUIPMENTS })
};

export const addEquipment = data => dispatch => {
  return dispatch({
    type: ADD_EQUIPMENT,
    data
  })
};

export const removeEquipments = () => dispatch => {
  return dispatch({
    type: REMOVE_EQUIPMENTS
  })
};