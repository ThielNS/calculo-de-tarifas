import { ADD_EQUIPMENT, LIST_EQUIPMENTS, REMOVE_EQUIPMENTS, RESET_LIST_EQUIPMENTS } from "./constants";
import { initialState, localStorageSetItem } from "./initialState";

const equipmentsReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_EQUIPMENT:

      const { data } = action;
      const newState = state.concat(data);
      localStorageSetItem(newState);

      return newState;

    case LIST_EQUIPMENTS:
      return state;

    case REMOVE_EQUIPMENTS:

      state = [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
        ];

      localStorageSetItem(newState);

      return newState;

    case RESET_LIST_EQUIPMENTS:

      state = [];
      localStorageSetItem(state);
      return state;

    default:
      return state;
  }
};

export default equipmentsReducer;