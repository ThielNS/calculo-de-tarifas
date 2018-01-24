
import { ADD_EQUIPMENT, LIST_EQUIPMENTS, REMOVE_EQUIPMENTS } from "../reducers/equipmentsReducer/constants";
import { get } from "../modules/request";

export const listEquipments = () => dispatch => {
  return dispatch({ type: LIST_EQUIPMENTS })
};

export const searchEquipments = name => dispatch => {

  const limit = 5;

  return get(`equipments?name={name}&limit={limit}`)
    .then(data => data)
    .catch(error => {
      console.error(error);
    })
};

export const addEquipment = data => dispatch => {
  console.log(data);

  // return post('calculate',)
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