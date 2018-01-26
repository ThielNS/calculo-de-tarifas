import { ADD_EQUIPMENT, LIST_EQUIPMENTS, REMOVE_EQUIPMENTS, SEARCH_EQUIPMENTS, LIST_CALCULATE_EQUIPMENTS } from "./constants";
import { initialState } from "./initialState";

const equipmentsReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_EQUIPMENT:

      const { data } = action;
      const newState = state.concat(data);
      localStorage.setItem('list', JSON.stringify(newState));

      return newState;

    case LIST_EQUIPMENTS:
      return state;

    case SEARCH_EQUIPMENTS:

      return action.data;

    case REMOVE_EQUIPMENTS:

      state = [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
        ];

      localStorage.setItem('list', JSON.stringify(state));

      return state;

    default:
      return state;
  }
};

export default equipmentsReducer;