import { LIST_DISTRIBUITORS } from "./constants";

const powerDistribuitorReducer = (state = [], action) => {
    switch (action.type) {
        case LIST_DISTRIBUITORS:
            return state;
        default:
            return state;
    }
}

export default powerDistribuitorReducer;