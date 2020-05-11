export const mainShop = function (state = { list: [] }, action) {
  switch (action.type) {
    case "SHOPS_FETCH_SUCCEEDED":
      return {
        list: action.shops
      };
    case "SHOPS_REMOVE":
      return {
        list: []
      };
    default:
      return state;
  }
};