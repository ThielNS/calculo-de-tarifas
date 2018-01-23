
import { ADD_EQUIPMENT, LIST_EQUIPMENTS, REMOVE_EQUIPMENTS, SEARCH_EQUIPMENTS, LIST_CALCULATE_EQUIPMENTS  } from "../reducers/equipmentsReducer/constants";
import { get, post } from "../modules/request";

export const listEquipments = () => dispatch => {
  return dispatch({ type: LIST_EQUIPMENTS })
};

export const calculate = () => dispatch => {
  return post('calculate')
  .then(data => (    
      dispatch({
          type: LIST_CALCULATE_EQUIPMENTS,
          data
      })
  ))
}

export const searchEquipments = name => dispatch => {

  const limit = 5;

  return get(`equipments?name=${name}&limit=${limit}`)
    .then(data => {
      return dispatch({
        type: SEARCH_EQUIPMENTS,
        data
      })
    })
    .catch(error => {
      console.error(error);
    })
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