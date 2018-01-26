import { LIST_DISTRIBUITORS, LIST_EQUIPMENTS_DISTRIBUITOR } from "./constants";


export const powerDistribuitorReducer = (state = [], action) => {
    switch (action.type) {
        case LIST_DISTRIBUITORS:

            const { data } = action;
            const newState = state.concat(data);
            localStorage.setItem('powerDistribuitorId', JSON.stringify(newState));

            return newState;

        default:
            return state;
    }
};

export const calculateEquipmentsDistribuitor = (state = [], action) => {
    switch (action.type) {
        case LIST_EQUIPMENTS_DISTRIBUITOR:
            return action.data;
        default:
            return state;
    }
}

/* export default powerDistribuitorReducer; */