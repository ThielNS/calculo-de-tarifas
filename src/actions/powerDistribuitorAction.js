import { LIST_DISTRIBUITORS } from "../reducers/powerDistribuitorReducer/constants"
import { get } from "../modules/request";

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