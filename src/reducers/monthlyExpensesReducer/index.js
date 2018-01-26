import { LIST_TARIFFS } from "./constants";
import initialState from "./initialState";

export const listTariffsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_TARIFFS:
            return state; 
        default:
            return state;
    }
}