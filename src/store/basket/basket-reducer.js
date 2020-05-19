const initialState = { list: {}, orderList: {}, successOrders: {}, failedOrders: {} };

export const basketReducer = function (state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case "BASKET_ADD_PRODUCT":
      return {
        ...state,
        list: {
          ...state.list,
          [action.product.id]: action.product
        }
      };
    case "BASKET_REMOVE_PRODUCT":
      newState = {...state};
      delete newState.list[action.product.id];
      return newState;
    case "BASKET_ORDER_PRODUCT_ADD":
      return {
        ...state,
        orderList: {
          ...state.orderList,
          [action.product.id]: action.product
        }
      };
    case "BASKET_ORDER_PRODUCT_REMOVE":
      newState = {...state};
      delete newState.orderList[action.order.id];
      return newState;
    case "BASKET_ORDER_PRODUCTS_START":
      newState = {...state};
      newState.orderList = action.orderList;
      return newState;
    case "BASKET_ORDERS_SUCCEEDED":
      newState = {...state};
      newState.successOrders = action.successOrders;
      return newState;
    case "BASKET_ORDERS_FAILED":
      newState = {...state};
      newState.failedOrders = action.failedOrders;
      return newState;
    case "BASKET_ORDER_SUCCEEDED":
      newState = {...state};
      newState.successOrders = {
        ...newState.successOrders,
        [action.successOrder.id]: action.successOrder
      };
      return newState;
    case "BASKET_ORDER_FAILED":
      newState = {...state};
      newState.failedOrders = {
        ...newState.failedOrders,
        [action.failedOrder.id]: action.failedOrder
      };
      return newState;
    default:
      return state;
  }
};