import React, { useState }  from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  Checkbox,
  Avatar,
  Typography,
  Button,
  Grid,
  LinearProgress
} from '@material-ui/core';

import BasketButton from './basket-button';

function BasketList({ list, orderList, failedOrders, successOrders }) {
  const dispatch = useDispatch();
  const goods = Object.values(list);
  const [selected, setSelected] = useState({});

  if (Object.keys(list).length === 0) return null;

  const handleChangeAll = ({ target: { checked } }) => {
    if (checked) {
      setSelected(list)
    } else {
      setSelected({});
    }
  };

  const handleChange = ({ target: { value, checked } }, { id, name, img }) => {
    if (checked) {
      setSelected({
        ...selected,
        [id]: { id, name, img }
      });
    } else {
      const newSelected = {
        ...selected
      };
      delete newSelected[id];
      setSelected(newSelected)
    }
  }

  return (
    <div style={{ paddingTop: 30 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems={"center"} alignContent={"center"}>
            <Grid item xs={2}>
              <Checkbox
                id={"selectAll"}
                checked={Object.keys(selected).length === goods.length}
                onChange={handleChangeAll}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant={"h4"}>All your products</Typography>
            </Grid>
            {Object.keys(selected).length ? (
              <>
                <Grid item xs={2}>
                  <Button color={"primary"} variant={"contained"} onClick={() => setSelected({})}>
                    Remove All Selected
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button color={"primary"} variant={"contained"} onClick={() => {
                    dispatch({
                      type: "BASKET_ORDERS_REQUESTED",
                      orderList: selected
                    })
                  }}>
                    Order All Selected
                  </Button>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Grid>
        {goods.map(({ name, img, id }) => {
          return (
            <Grid key={id} item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={1}>
                  <Checkbox
                    checked={!!selected[id]}
                    onChange={e => handleChange(e, { name, img, id })}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Avatar alt="Remy Sharp" src={img} />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant={"h5"}>
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  {orderList[id] && <LinearProgress color="secondary" />}
                </Grid>
                <Grid item xs={4}>
                  <BasketButton orderId={id} order={{ name, img, id }} orderList={orderList} failedOrders={failedOrders} successOrders={successOrders} />
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default connect(({ basket } = {}) => ({
  list: basket?.list || {},
  orderList: basket?.orderList || {},
  failedOrders: basket?.failedOrders || {},
  successOrders: basket?.successOrders || {}
}), {})(BasketList);