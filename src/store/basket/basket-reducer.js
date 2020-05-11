export const basketReducer = function (state = { list: [] }, action) {
  switch (action.type) {
    case "BASKET_ADD_PRODUCT":
      return {
        ...state,
        [action.product.id]: action.product
      };
    case "BASKET_REMOVE_PRODUCT":
      const newState = {...state};
      delete newState[action.product.id];
      return newState;
    default:
      return state;
  }
};