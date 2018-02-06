import {
  ADD_EQUIPMENT,
  EDIT_EQUIPMENTS,
  EDIT_USE_OF_MONTH,
  LIST_EQUIPMENTS,
  REMOVE_EQUIPMENTS,
  RESET_LIST_EQUIPMENTS,
  LIST_EQUIPMENTS_DISTRIBUITOR,
  UPDATE_MONTH_EQUIPMENTS,
  DELETE_DATES,
  EDIT_NAME_EQUIPMENT
} from "./constants";
import { initialState, localStorageSetItem } from "./initialState";

const equipmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EQUIPMENT:
      const { data } = action;
      const id = 1;
      const newState = state.concat(data);

      const newStateId = newState.map(equipment => {
        equipment.date.useOfMonth.map(dateTime => {
          dateTime.id = id + 1;
          return dateTime
        });
        return equipment
      });

      console.log(newStateId)

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

    case UPDATE_MONTH_EQUIPMENTS:
      let { updateData } = action;
      localStorageSetItem(updateData);

      return updateData;

    case DELETE_DATES:
      const { indexEquipment, indexDate } = action;

      let useOfMonth = state[indexEquipment].date.useOfMonth;

      const newUseOfMonth = [
        ...useOfMonth.slice(0, indexDate),
        ...useOfMonth.slice(indexDate + 1)
      ];

      const resultState = state.map((equipment, indexE) => {
        if(indexE === indexEquipment) {
          equipment.date.useOfMonth = newUseOfMonth
        }
        return equipment
      });

      localStorageSetItem(resultState);
      console.log(resultState);
      return resultState;

    case EDIT_NAME_EQUIPMENT:

      const { indexState, nameEquipment } = action;

      const editNameEquipment = state.map((item, index) => {
        if(index === indexState) {
          item.nameEquipment = nameEquipment
        }

        return item;
      });

      localStorageSetItem(editNameEquipment);
      return editNameEquipment ;

    default:
      return state;
  }
};

export default equipmentsReducer;
