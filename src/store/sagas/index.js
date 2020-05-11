import { all } from 'redux-saga/effects';

import shopsSaga from './shops';

export default function* sagas() {
  yield all([
    ...shopsSaga,
  ]);
}