import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';

function ProductsButton({ product }) {
  const dispatch = useDispatch();
  const basketList = useSelector(state => state.basket?.list || {});

  if (basketList[product.id]) {
    return (
      <Button color={"primary"} variant={"contained"} onClick={() => dispatch({
        type: "BASKET_REMOVE_PRODUCT",
        product
      })}>
        Remove
      </Button>
    );
  }

  return (
    <Button color={"secondary"} variant={"contained"} onClick={() => dispatch({
      type: "BASKET_ADD_PRODUCT",
      product
    })}>
      Add to basketList
    </Button>
  );
}

export default ProductsButton;