export const storeReducer = function (state = { list: [] }, action) {
  switch (action.type) {
    case "STORES_FETCH_SUCCEEDED":
      return {
        list: action.list
      };
    case "STORES_REMOVE":
      return {
        list: []
      };
    default:
      return state;
  }
};