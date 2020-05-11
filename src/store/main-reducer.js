import { combineReducers } from 'redux';

import { storeReducer } from './store/store-reducer';
import { productReducer } from './product/product-reducer';
import { basketReducer } from './basket/basket-reducer';
import { pageReducer } from './pages/pages-reducer';

export const initialState = {
  store: {
    list: []
  },
  products: {
    list: []
  },
  basket: {},
  page: null
};

export const mainReducer = combineReducers({
  store: storeReducer,
  products: productReducer,
  basket: basketReducer,
  page: pageReducer
});