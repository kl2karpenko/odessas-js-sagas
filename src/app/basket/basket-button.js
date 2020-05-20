import React  from 'react';
import { useDispatch } from 'react-redux';

import { Button, Grid } from '@material-ui/core';

function BasketButton({ orderId, orderList, order, failedOrders, successOrders }) {
  const dispatch = useDispatch();

  if (failedOrders[orderId]) {
    return (
      <Button color={"secondary"} onClick={() => dispatch({
        type: "BASKET_ORDER_REQUESTED",
        orderId,
        order
      })}
      >
        Order failed to process, Reorder?
      </Button>
    )
  }

  if (successOrders[orderId]) {
    return (
      <Button color={"primary"}>
        Success!
      </Button>
    )
  }

  return !orderList[orderId] ? (
    <Grid container spacing={4} justify={"flex-end"}>
      <Grid item>
        <Button color={"primary"} variant={"contained"} onClick={() => dispatch({
          type: "BASKET_REMOVE_PRODUCT",
          product: order
        })}>
          Remove
        </Button>
      </Grid>
      <Grid item>
        <Button color={"secondary"} variant={"contained"} onClick={() => {
          dispatch({
            type: "BASKET_ORDER_REQUESTED",
            orderId,
            order
          })
        }
        }>
          Order
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={4}>
      <Grid item>
        <Button color={"secondary"} variant={"contained"} onClick={() => dispatch({
          type: "BASKET_ORDER_CANCELED",
          orderId: orderId
        })}
        >
          Stop process
        </Button>
      </Grid>
    </Grid>
  )
}

export default BasketButton;