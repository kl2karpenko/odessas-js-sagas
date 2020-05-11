import { combineReducers } from 'redux';

import { mainShop } from './main-shop';

export const initialState = {
  shop: {}
};

export const mainReducer = combineReducers({
  shop: mainShop
});