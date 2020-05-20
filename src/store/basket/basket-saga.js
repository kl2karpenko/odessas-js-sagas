import { all, put, call, takeLatest, takeEvery, race, spawn, cancelled, take, fork, delay, cancel } from 'redux-saga/effects';
import BasketAPI from './basket-api';

const basketAPI = new BasketAPI();

function* createOrderBy({ orderId }) {
  try {
    yield call(basketAPI.createSingleOrder, { orderId });
    yield delay(1500);
    yield put({ type: "BASKET_ORDER_SUCCEEDED", successOrderId: orderId });
  } catch (e) {
    yield put({ type: "BASKET_ORDER_FAILED", failedOrderId: orderId });
  }
}

function* createOrder({ orderList }) {
  yield all(
    Object.keys(orderList).map(
      orderId => put({
        type: "BASKET_ORDER_REQUESTED",
        orderId,
        order: orderList[orderId]
      })
    )
  );
}

function* handleOrderProduct(requests, orderProduct) {
  const { type, orderId, failedOrderId, successOrderId  } = yield take([
    'BASKET_ORDER_CANCELED',
    'BASKET_ORDER_SUCCEEDED',
    'BASKET_ORDER_FAILED'
  ]);

  switch (type) {
    case "BASKET_ORDER_CANCELED": {
      const request = requests.get(orderId);
      if (orderId && request) {
        yield cancel(request);
        requests.delete(orderId);
      } else if (!orderId) {
        yield all([...requests.values()].map(request => cancel(request)));
        requests.clear();
      }
      // canceling the event by hands
      yield cancel(orderProduct);
      break;
    }
    case "BASKET_ORDER_SUCCEEDED": {
      requests.delete(successOrderId);
      console.log(requests, ' requests after delete ');
      break;
    }
    case "BASKET_ORDER_FAILED": {
      requests.delete(failedOrderId);
      break;
    }
    default:
      break;
  }
}

function* watchCreateOrder() {
  const requests = new Map();

  while (true) {
    const orderProduct = yield fork(function* upload() {
      while (true) {
        const { orderId } = yield take('BASKET_ORDER_REQUESTED');
        const request = yield spawn(createOrderBy, { orderId });
        const prev = requests.get(orderId);
        if (prev) {
          requests.delete(orderId);
          yield cancel(prev);
        }
        requests.set(orderId, request);
      }
    });

    yield call(handleOrderProduct, requests, orderProduct);
  }
}

export function* watchCreateOrderAll() {
  yield takeLatest("BASKET_ORDERS_REQUESTED", createOrder);
}

const basketSaga = [
  fork(watchCreateOrderAll),
  fork(watchCreateOrder),
];

export default basketSaga;