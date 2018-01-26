let list = localStorage.getItem('list');

list = list ? JSON.parse(list) : [];

export const initialState = list;

export const localStorageSetItem = value => {
  localStorage.setItem('list', JSON.stringify(value));
};