import React  from 'react';
import { connect, useDispatch } from 'react-redux';

import { Button, Grid, Typography } from '@material-ui/core';

import BasketList from './basket-list';

function Basket({ list }) {
  if (Object.keys(list).length === 0) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant={"h4"}>Your basket is empty</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <BasketList />
      </Grid>
    </Grid>
  );
}

export default connect(({ basket }) => ({
  list: basket?.list || {}
}), {})(Basket);