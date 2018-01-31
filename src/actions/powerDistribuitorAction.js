import {
  LIST_DISTRIBUITORS,
  LIST_EQUIPMENTS_DISTRIBUITOR
} from "../reducers/powerDistribuitorReducer/constants";
import { get, post } from "../modules/request";

export const listDistribuitors = (index, dataItem) => dispatch => {
  return get("powerdistribuitors")
    .then(data =>
      dispatch({
        type: LIST_DISTRIBUITORS,
        data
      })
    )
    .catch(Error => {});
};

export const listCalculateEquipments = (data, distribuitorId) => dispatch => {
  console.log(data);
  console.log(distribuitorId);

  data.map(item => {
    item.useOfMonth = item.date.useOfMonth;
    return item;
  });
  

  console.log(data);
  const teste = {
    powerDistribuitorId: distribuitorId,
    month: 1,
    equipments: data
  };
  return post("calculate", teste)
    .then(response => {
      return dispatch({
        type: LIST_EQUIPMENTS_DISTRIBUITOR,
        data
      });
    })
    .catch(error => {});
};

/* export const listCalculateEquipments = data => dispatch => {
    return dispatch({
      type: ADD_EQUIPMENT,
      data
    })
  }; */
