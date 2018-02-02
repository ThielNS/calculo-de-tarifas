import {GET_MONTH} from "../reducers/chooseMonthlyReducer/constants";

export const getMonth = (monthIndex) => dispatch => {
    return {
      type: GET_MONTH,
      monthIndex
    };
  };
  