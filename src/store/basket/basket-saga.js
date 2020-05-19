import { put, call, takeLatest, fork, takeEvery, delay } from 'redux-saga/effects';
import BasketAPI from './basket-api';

const basketAPI = new BasketAPI();

function* createOrderBy({ order }) {
  try {
    yield delay(20000);
    yield call(basketAPI.createSingleOrder, { order });
    yield put({ type: "BASKET_ORDER_SUCCEEDED", orderList: {}, successOrder: order });
  } catch (e) {
    yield put({ type: "BASKET_ORDER_FAILED", orderList: {}, failedOrder: order });
  }
}

function* createOrder({ orderList }) {
  try {
    yield delay(20000);
    yield call(basketAPI.createOrder, { orderList });
    yield put({ type: "BASKET_ORDERS_SUCCEEDED", orderList: {}, successOrders: orderList });
  } catch (e) {
    yield put({ type: "BASKET_ORDERS_FAILED", orderList: {}, failedOrders: orderList });
  }
}

export function* watchCreateOrderAll() {
  yield takeLatest("BASKET_ORDERS_REQUESTED", createOrder);
}

export function* watchCreateOrder() {
  yield takeEvery("BASKET_ORDER_REQUESTED", createOrderBy);
}

const productsSaga = [
  fork(watchCreateOrderAll),
  fork(watchCreateOrderAll),
];

export default productsSaga;