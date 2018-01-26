import { LIST_MONTHLY } from "./constants";

const listMonthly = (state = [], action) => {
/* 
    const { data } = action;
    const newState = state.concat(data);
    localStorage.setItem('powerDistribuitorId', JSON.stringify(newState)); */

    switch (action.type) {
        case LIST_MONTHLY:
            return action.data
        default:
            return state;
    }
}

export default listMonthly;