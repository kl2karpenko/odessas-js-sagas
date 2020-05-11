import { put, call, takeLatest, fork } from 'redux-saga/effects';
import ProductApi from './product-api';

const productAPI = new ProductApi();

function* fetchProductsInStore({ productId }) {
  try {
    const stores = yield call(productAPI.getProductInStore, productId);
    yield put({ type: "PRODUCTS_FETCH_SUCCEEDED", list: stores });
  } catch (e) {
    yield put({ type: "PRODUCTS_FETCH_FAILED", message: e.message});
  }
}

export function* watchProductsSaga() {
  yield takeLatest("PRODUCTS_FETCH_REQUESTED", fetchProductsInStore);
}

const productsSaga = [
  fork(watchProductsSaga)
];

export default productsSaga;