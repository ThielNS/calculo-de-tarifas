let monthIndex = localStorage.getItem('monthIndex');

monthIndex = monthIndex ? monthIndex : null;

export const initialState = Math.floor(monthIndex);

export const localStorageSetItem = value => {
  localStorage.setItem('monthIndex', JSON.stringify(value));
};
