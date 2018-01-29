import { LIST_MONTHS } from "./constants";

const listMonthly = (state = [], action) => {

    switch (action.type) {
        case LIST_MONTHS:
            const { data } = action;
            const newState = state.concat(data);
            localStorage.setItem('monthIndex', JSON.stringify(newState));
            
            return newState;
        default:
            return state;
    }
}

export default listMonthly;