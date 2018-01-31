import { LIST_DISTRIBUITORS } from "./constants";
import { initialState, localStorageSetItem } from "./initialState";

export const powerDistribuitorReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_DISTRIBUITORS:

            const { data } = action;
            localStorageSetItem(data)
            
            return data;

        default:
            return state;
    }
};


