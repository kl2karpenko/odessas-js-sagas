import { put, call, takeLatest, fork } from 'redux-saga/effects';
import StoreApi from './store-api';

const storeAPI = new StoreApi();

function* fetchAllStores() {
  try {
    const { data: stores } = yield call(storeAPI.getAllShops);
    yield put({ type: "STORES_FETCH_SUCCEEDED", list: stores });
  } catch (e) {
    yield put({ type: "STORES_FETCH_FAILED", message: e.message});
  }
}

export function* watchShopsSaga() {
  yield takeLatest("STORES_FETCH_REQUESTED", fetchAllStores);
}

const storesSaga = [
  fork(watchShopsSaga)
];

export default storesSaga;