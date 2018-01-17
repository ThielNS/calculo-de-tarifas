import { LIST_EQUIPMENTS } from "./constants";

const equipmentsReducer = (state = [], action) => {
  switch(action.type) {
    case LIST_EQUIPMENTS:
      return state;
    default:
      return state;
  }
};

export default equipmentsReducer;