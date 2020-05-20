export const basketReducer = function (state = { list: {}, orderList: {}, successOrders: {}, failedOrders: {} }, action) {
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
      return {
        ...state,
        list: {
          ...state.list,
          [action.product.id]: null
        }
      };
    case "BASKET_ORDER_REQUESTED":
      return {
        ...state,
        orderList: {
          ...state.orderList,
          [action.orderId]: action.order
        }
      };
    case "BASKET_ORDER_PRODUCT_REMOVE":
      return {
        ...state,
        orderList: {
          ...state.orderList,
          [action.order.id]: null
        }
      }
    case "BASKET_ORDERS_SUCCEEDED":
      return {
        ...state,
        successOrders: action.successOrders,
        orderList: {}
      };
    case "BASKET_ORDERS_FAILED":
      return {
        ...state,
        failedOrders: action.failedOrders,
        orderList: {}
      };
    case "BASKET_ORDER_SUCCEEDED":
      return {
        ...state,
        successOrders: {
          ...state.successOrders,
          [action.successOrderId]: state.orderList[action.successOrderId]
        },
        orderList: {
          ...state.orderList,
          [action.successOrderId]: null
        }
      };
    case "BASKET_ORDER_FAILED":
      return {
        ...state,
        failedOrders: {
          ...state.failedOrders,
          [action.failedOrderId]: state.orderList[action.failedOrderId]
        },
        orderList: {
          ...state.orderList,
          [action.failedOrderId]: null
        }
      };
    case "BASKET_ORDER_CANCELED":
      return {
        ...state,
        canceledOrders: {
          ...state.canceledOrders,
          [action.orderId]: state.orderList[action.orderId]
        },
        orderList: {
          ...state.orderList,
          [action.orderId]: null
        }
      };
    default:
      return state;
  }
};