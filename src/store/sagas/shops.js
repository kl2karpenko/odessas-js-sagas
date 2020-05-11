import { put, call, takeLatest, fork } from 'redux-saga/effects';
import appAPI from '../api';

function* fetchAllShops() {
  try {
    console.log('call');
    const shops = yield call(appAPI.shopsApi.getAllShops);
    console.log(shops, ' shops ');
    yield put({ type: "SHOPS_FETCH_SUCCEEDED", shops });
  } catch (e) {
    yield put({ type: "SHOPS_FETCH_FAILED", message: e.message});
  }
}

export function* watchShopsSaga() {
  yield takeLatest("SHOPS_FETCH_REQUESTED", fetchAllShops);
}

const shopsSaga = [
  fork(watchShopsSaga)
];

export default shopsSaga;