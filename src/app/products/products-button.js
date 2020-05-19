import React  from 'react';
import {connect, useDispatch} from 'react-redux';

import { Button } from '@material-ui/core';

function ProductsButton({ product, basket }) {
  const dispatch = useDispatch();

  if (basket[product.id]) return (
    <Button color={"primary"} variant={"contained"} onClick={() => dispatch({
      type: "BASKET_REMOVE_PRODUCT",
      product
    })}>
      Remove
    </Button>
  );

  return (
    <Button color={"secondary"} variant={"contained"} onClick={() => dispatch({
      type: "BASKET_ADD_PRODUCT",
      product
    })}>
      Add to basket
    </Button>
  );
}

export default connect(null, {})(ProductsButton);