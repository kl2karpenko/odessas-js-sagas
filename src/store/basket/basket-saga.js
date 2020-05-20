import { all, put, call, takeLatest, spawn, take, fork, delay, cancel } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import BasketAPI from './basket-api';

const basketAPI = new BasketAPI();

function* createOrder({ orderList }) {
  yield all(
    Object.keys(orderList).map(
      orderId => put({
        type: "BASKET_ORDER_REQUESTED",
        orderId,
        order: orderList[orderId]
      })
    )
  );
}

function createWaitingOrder(orderId) {
  // number of processing callbacks to be skipped to decrease unnecessary redux state updates
  const skipRequestCbs = 5;
  let counter = 0;
  let emit;
  const uploadStartTime = Date.now();
  const channel = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({ total, loaded }) => {
    const newDate = Date.now();
    const uploadingSpeed = loaded / ((newDate - uploadStartTime) / 1000);
    const uploadingTimeLeft =
      uploadingSpeed && (total - loaded) / uploadingSpeed;

    if (total - loaded === 0 || counter % skipRequestCbs === 0) {
      emit({
        orderId,
        uploadingSize: loaded,
        uploadingTimeLeft
      });
    }

    if (total === loaded) emit(END);
    counter += 1;
  };
  const uploadPromise = basketAPI.createOrderUploader(
    { orderId },
    uploadProgressCb
  );
  return [uploadPromise, channel];
}

function* handleOrderProduct(requests, orderProduct) {
  const { type, orderId, failedOrderId, successOrderId  } = yield take([
    'BASKET_ORDER_CANCELED',
    'BASKET_ORDER_SUCCEEDED',
    'BASKET_ORDER_FAILED'
  ]);

  switch (type) {
    case "BASKET_ORDER_CANCELED": {
      const request = requests.get(orderId);
      if (orderId && request) {
        yield cancel(request);
        requests.delete(orderId);
      } else if (!orderId) {
        yield all([...requests.values()].map(request => cancel(request)));
        requests.clear();
      }
      // canceling the event by hands
      yield cancel(orderProduct);
      break;
    }
    case "BASKET_ORDER_SUCCEEDED": {
      requests.delete(successOrderId);
      break;
    }
    case "BASKET_ORDER_FAILED": {
      requests.delete(failedOrderId);
      break;
    }
    default:
      break;
  }
}

function* watchUploadProgress(channel) {
  while (true) {
    const { orderId, uploadingSize } = yield take(channel);
    yield put({
      type: "BASKET_ORDER_PENDING",
      uploadingSize,
      orderId
    });
  }
}

function* createOrderBy({ orderId }) {
  try {
    const [uploadPromise, channel] = yield call(
      createWaitingOrder,
      orderId
    );
    yield fork(watchUploadProgress, channel);
    yield call(() => uploadPromise);
    yield delay(1500);
    yield put({ type: "BASKET_ORDER_SUCCEEDED", successOrderId: orderId });
  } catch (e) {
    yield put({ type: "BASKET_ORDER_FAILED", failedOrderId: orderId });
  }
}

function* watchCreateOrder() {
  const requests = new Map();

  while (true) {
    const orderProduct = yield fork(function* upload() {
      while (true) {
        const { orderId } = yield take('BASKET_ORDER_REQUESTED');
        const request = yield spawn(createOrderBy, { orderId });
        const prev = requests.get(orderId);
        if (prev) {
          requests.delete(orderId);
          yield cancel(prev);
        }
        requests.set(orderId, request);
      }
    });

    yield call(handleOrderProduct, requests, orderProduct);
  }
}

export function* watchCreateOrderAll() {
  yield takeLatest("BASKET_ORDERS_REQUESTED", createOrder);
}

const basketSaga = [
  fork(watchCreateOrderAll),
  fork(watchCreateOrder),
];

export default basketSaga;