import {
  ADD_EQUIPMENT,
  EDIT_EQUIPMENTS,
  EDIT_USE_OF_MONTH,
  LIST_EQUIPMENTS,
  REMOVE_EQUIPMENTS,
  RESET_LIST_EQUIPMENTS,
  LIST_EQUIPMENTS_DISTRIBUITOR
} from "./constants";
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

      localStorageSetItem(state);
      return state;

    case EDIT_EQUIPMENTS:
      const { index, dataItem } = action;

      state = state.map((item, i) => {
        if (index === i) {
          item = dataItem;
        }
        return item;
      });

      localStorageSetItem(state);

      return state;

    case RESET_LIST_EQUIPMENTS:
      state = [];
      localStorageSetItem(state);
      return state;

    case EDIT_USE_OF_MONTH:
      const editState = state.map((equipment, index) => {
        if (index === action.indexEquipment) {
          equipment = action.data;
        }
        return equipment;
      });

      localStorageSetItem(editState);

      return editState;
    case LIST_EQUIPMENTS_DISTRIBUITOR:
      let { dataList } = action;
      localStorageSetItem(dataList);

      return dataList;
    default:
      return state;
  }
};

export default equipmentsReducer;
