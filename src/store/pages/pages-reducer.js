export const PAGES = {
  store: 'STORES',
  products: 'PRODUCTS',
  basket: 'BASKET',
};

export const pageReducer = function (state = null, action) {
  switch (action.type) {
    case "CHANGE_PAGE":
      return action.page;
    default:
      return state;
  }
};