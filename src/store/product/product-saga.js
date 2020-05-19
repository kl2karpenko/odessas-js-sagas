import { put, call, takeLatest, fork } from 'redux-saga/effects';
import ProductApi from './product-api';

const productAPI = new ProductApi();

function* fetchAllProducts() {
  try {
    const stores = yield call(productAPI.getAllProducts);
    yield put({ type: "PRODUCTS_FETCH_SUCCEEDED", list: stores });
  } catch (e) {
    yield put({ type: "PRODUCTS_FETCH_FAILED", message: e.message});
  }
}

function* fetchProductsInStore({ productId }) {
  try {
    const products = yield call(productAPI.getProductInStore, { productId });
    yield put({ type: "PRODUCT_FETCH_SUCCEEDED", list: products });
  } catch (e) {
    yield put({ type: "PRODUCT_FETCH_FAILED", message: e.message});
  }
}

export function* watchProductsSaga() {
  yield takeLatest("PRODUCTS_FETCH_REQUESTED", fetchAllProducts);
}

export function* watchAllProductsSaga() {
  yield takeLatest("PRODUCT_FETCH_REQUESTED", fetchProductsInStore);
}

const productsSaga = [
  fork(watchProductsSaga),
  fork(watchAllProductsSaga),
];

export default productsSaga;