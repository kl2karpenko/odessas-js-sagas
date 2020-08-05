import { all, put, call, take, fork, delay, cancel, actionChannel } from 'redux-saga/effects';
import BasketAPI from './basket-api';

const basketAPI = new BasketAPI();

function* createOrderBy({ orderId }) {
  try {
    yield fork(basketAPI.createOrderUploader, { orderId });
    yield delay(1500);
    yield put({ type: "BASKET_ORDER_SUCCEEDED", successOrderId: orderId });
  } catch (e) {
    yield put({ type: "BASKET_ORDER_FAILED", failedOrderId: orderId });
  }
}

function* watchQueuedOrders() {
  const requestChan = yield actionChannel('BASKET_ORDER_REQUESTED')
  while (true) {
    const { orderId } = yield take(requestChan);
    yield call(createOrderBy, { orderId });
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
