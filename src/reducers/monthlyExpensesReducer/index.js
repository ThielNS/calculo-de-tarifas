import { LIST_TARIFFS } from "./constants";
import { initialState, localStorageSetItem } from "../equipmentsReducer/initialState";

export const listTariffsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_TARIFFS:
            const { data } = action;
            const newState = state.concat(data);
            localStorageSetItem(newState);

            return newState;

        default:
            return state;
    }
}