let itemsDistribuitors = localStorage.getItem("itemsDistribuitors");

itemsDistribuitors = itemsDistribuitors === undefined ? JSON.parse(itemsDistribuitors) : [];

export const initialState = itemsDistribuitors;

export const localStorageSetItem = value => {
  localStorage.setItem("itemsDistribuitors", JSON.stringify(value));
};
