
import { TOGGLE_MODAL } from "../reducers/modalReducer/constants";

export const toggleModal = value => dispatch => {

  const showModal = !value;

  return dispatch({
    type: TOGGLE_MODAL,
    showModal
  });
};