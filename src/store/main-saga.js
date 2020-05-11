import { all } from 'redux-saga/effects';

import storesSaga from './store/stores-saga';
import productsSaga from './product/product-saga';

export default function* sagas() {
  yield all([
    ...storesSaga,
    ...productsSaga
  ]);
}