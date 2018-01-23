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

export const listCalculateEquipments = () => dispatch => {
    return post('calculate')
    .then(data => (
        dispatch({
            type: LIST_EQUIPMENTS_DISTRIBUITOR,
            data
        })
    ))
}