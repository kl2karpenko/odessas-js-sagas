import { all, put, call, take, fork, delay, cancel, actionChannel } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import BasketAPI from './basket-api';

const basketAPI = new BasketAPI();

function* handleOrderProduct(requests) {
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
      break;
    }
    case "BASKET_ORDER_SUCCEEDED": {
      requests.delete(successOrderId);
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

function* createOrderBy({ orderId }) {
  try {
    yield fork(basketAPI.createOrderUploader, { orderId });
    yield delay(1500);
    yield put({ type: "BASKET_ORDER_SUCCEEDED", successOrderId: orderId });
  } catch (e) {
    yield put({ type: "BASKET_ORDER_FAILED", failedOrderId: orderId });
  }
}

function* createSingleOrder(channel) {
  const requests = new Map();

  while (true) {
    const { orderId } = yield take(channel);
    const request = yield fork(createOrderBy, { orderId });
    const prev = requests.get(orderId);
    if (prev) {
      requests.delete(orderId);
      yield cancel(prev);
    }
    requests.set(orderId, request);

    yield call(handleOrderProduct, requests);
  }
}

function* watchQueuedOrders() {
  // create a channel to queue incoming requests
  const chan = yield call(channel)

  // create 3 worker 'threads'
  for (var i = 0; i < 3; i++) {
    yield fork(createSingleOrder, chan)
  }

  while (true) {
    const { orderId } = yield take('BASKET_ORDER_REQUESTED')
    yield put(chan, { orderId });
  }
}

export function* watchCreateOrderAll() {
  while (true) {
    const { orderList } = yield take('BASKET_ORDERS_REQUESTED');

    for (const orderId of Object.keys(orderList)) {
      yield put({
        type: "BASKET_ORDER_REQUESTED",
        orderId
      });
    }
  }
}

const basketSaga = [
  fork(watchCreateOrderAll),
  fork(watchQueuedOrders),
];

export default basketSaga;
