import { GET_MONTH } from "./constants";
import { initialState, localStorageSetItem } from "./initialState";

const getMonth = (state = initialState, action) => {
  switch (action.type) {
    case GET_MONTH:

      const { value } = action;

      localStorageSetItem(value);

      return value;

    default:
      return state;
  }
};

export default getMonth;
