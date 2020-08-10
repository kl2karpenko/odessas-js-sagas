import { all, put, call, take, fork, delay, cancel, actionChannel } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import BasketAPI from './basket-api';

const basketAPI = new BasketAPI()

function* createOrderBy({ orderId }) {
  try {
    yield fork(basketAPI.createOrderUploader, { orderId });
    yield put({ type: "BASKET_ORDER_SUCCEEDED_" + orderId, successOrderId: orderId });
  } catch (e) {
    yield put({ type: "BASKET_ORDER_FAILED_" + orderId, failedOrderId: orderId });
  }
}

function* createOrder({ orderId }) {
  const request = yield fork(createOrderBy, { orderId });
  const CANCEL_ACTION = `BASKET_ORDER_CANCELED_${orderId}`;
  const SUCCESS_ACTION = `BASKET_ORDER_SUCCEEDED_${orderId}`;
  const FAILED_ACTION = `BASKET_ORDER_FAILED_${orderId}`;
  const { type, successOrderId, failedOrderId } = yield take([
    `BASKET_ORDER_CANCELED_${orderId}`,
    `BASKET_ORDER_SUCCEEDED_${orderId}`,
    `BASKET_ORDER_FAILED_${orderId}`
  ]);

  switch(type) {
    case CANCEL_ACTION:
      request.cancel();
      yield cancel(request);
      yield put({
        type: 'BASKET_ORDER_CANCELED',
        orderId
      });
      break;
    case SUCCESS_ACTION:
      yield put({
        type: 'BASKET_ORDER_SUCCEEDED',
        successOrderId
      });
      break;
    case FAILED_ACTION:
      yield put({
        type: 'BASKET_ORDER_FAILED',
        failedOrderId
      });
      break;
    default:
      break;
  }
}

function* createSingleOrder(channel) {
  while (true) {
    const { orderId } = yield take(channel);
    yield call(createOrder, { orderId });
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
