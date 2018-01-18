import { ADD_EQUIPMENT, LIST_EQUIPMENTS, REMOVE_EQUIPMENTS } from "./constants";
import { initialState } from "./initialState";

const equipmentsReducer = (state = initialState, action) => {

  switch(action.type) {
    case ADD_EQUIPMENT:

      const { data } = action;
      const newState = state.concat(data);
      localStorage.setItem('list', newState);

      return newState;

    case LIST_EQUIPMENTS:
      return state;

    case REMOVE_EQUIPMENTS:

      localStorage.clear('list');
      return state;

    default:
      return state;
  }
};

export default equipmentsReducer;