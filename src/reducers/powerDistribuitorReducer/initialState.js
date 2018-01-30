let itemsDistribuitors = localStorage.getItem('list');

itemsDistribuitors = itemsDistribuitors ? JSON.parse(itemsDistribuitors) : [];

export const initialState = itemsDistribuitors;

export const localStorageSetItem = value => {
  localStorage.setItem('itemsDistribuitors', JSON.stringify(value));
};
