import { GET_MONTH } from "../reducers/chooseMonthlyReducer/constants";

export const changeMonth = (monthIndex) => dispatch => {
  return dispatch({
    type: GET_MONTH,
    value: monthIndex
  })
};
