import { all } from 'redux-saga/effects';

import storesSaga from './store/stores-saga';
import productsSaga from './product/product-saga';
import basketSaga from './basket/basket-saga';

export default function* sagas() {
  yield all([
    ...storesSaga,
    ...productsSaga,
    ...basketSaga
  ]);
}