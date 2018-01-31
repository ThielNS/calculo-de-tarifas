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

const powerdistribuitorId = "019EA005-6182-4F8D-95A4-DE3D86CBA51B";
const monthIndex = 1;

export const listCalculateEquipments = data => dispatch => { 
    console.log(data);
    return post("calculate", data)
    .then(data => {
      return dispatch({
        type: LIST_EQUIPMENTS_DISTRIBUITOR,
        data
      });
    })
    .catch(error => {
      console.log("error");
    });
};

/* export const listCalculateEquipments = data => dispatch => {
    return dispatch({
      type: ADD_EQUIPMENT,
      data
    })
  }; */
