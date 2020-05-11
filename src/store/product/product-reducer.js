export const productReducer = function (state = { list: [] }, action) {
  switch (action.type) {
    case "PRODUCTS_FETCH_SUCCEEDED":
      return {
        list: action.list
      };
    case "PRODUCTS_REMOVE":
      return {
        list: []
      };
    default:
      return state;
  }
};