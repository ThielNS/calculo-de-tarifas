import { LIST_DISTRIBUITORS, LIST_EQUIPMENTS_DISTRIBUITOR } from "../reducers/powerDistribuitorReducer/constants"
import { get, post } from "../modules/request";

export const listDistribuitors = () => dispatch => {
    return get('powerdistribuitors')
        .then(data => (
            dispatch({
                type: LIST_DISTRIBUITORS,
                data
            })
        ))
        .catch(Error => {

        })
}

export const listCalculateEquipments = bodyParameters => dispatch => {
    return post('calculate', bodyParameters)
        .then(data => {
            return dispatch({
                type: LIST_EQUIPMENTS_DISTRIBUITOR,
                data
            });
        })
        .catch(error => {
            console.log("error")
        })
}

/* export const listCalculateEquipments = data => dispatch => {
    return dispatch({
      type: ADD_EQUIPMENT,
      data
    })
  }; */