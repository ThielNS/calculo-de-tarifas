let list = localStorage.getItem('list');

list = list ? JSON.parse(list) : [];

export const initialState = list;