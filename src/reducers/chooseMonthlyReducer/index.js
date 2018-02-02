import { LIST_MONTHS, GET_MONTH } from "./constants";
import { initialState, localStorageSetItem } from "./initialState";

const listMonthly = (state = initialState, action) => {
  switch (action.type) {
    case LIST_MONTHS:
      const { data } = action;

      //localStorage.setItem("monthIndex", JSON.stringify(newState));
      return data;

    case GET_MONTH:
      const { monthIndex } = action;
  
      state = state.map((item, i) => {
        if (monthIndex === i) {
          
        }
        return i;
      });

       localStorageSetItem(state);

      return state;
    default:
      return state;
  }
};

export default listMonthly;
