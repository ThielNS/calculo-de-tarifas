import {LIST_DISTRIBUITORS} from "../reducers/powerDistribuitorReducer/constants"

export const listDistribuitors = () => dispatch => {
    return dispatch ({type:LIST_DISTRIBUITORS})
}