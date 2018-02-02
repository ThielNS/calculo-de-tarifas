let listMonths = localStorage.getItem('listMonths');


listMonths = listMonths ? JSON.parse(listMonths) : [];

export const initialState = listMonths;



export const localStorageSetItem = value => {
  localStorage.setItem('listMonths', JSON.stringify(value));
};
