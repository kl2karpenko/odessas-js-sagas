import React from 'react';
import { Button, Grid, makeStyles, Typography, Badge } from '@material-ui/core'
import { Provider, connect, useDispatch } from 'react-redux';

import { Stores } from './store';
import { Products } from './products';
import { Basket } from './basket';
import { PAGES } from '../store/pages/pages-reducer';

import store from '../store';
const useStyles = makeStyles({
  root: {
    padding: 20
  }
});

const renderPage = page => {
  switch (page) {
    case PAGES.store:
      return <Stores />;
    case PAGES.products:
      return <Products />;
    case PAGES.basket:
      return <Basket />;
    default:
      return null;
  }
}

function App({ page, basket }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Provider store={store}>
      <Grid container spacing={4} justify={'center'}>
        <Grid item xs={12}>
          <Typography variant={"h4"}>Get a lists of shops or products right now, and start shopping!</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4} justify={'center'}>
            <Grid item xs={8}>
              <Grid container spacing={4} justify="flex-start">
                <Grid item>
                  <Button variant={"contained"} color="primary" onClick={() => dispatch({ type: 'CHANGE_PAGE', page: PAGES.store })}>Stores</Button>
                </Grid>
                <Grid item>
                  <Button variant={"contained"} color="secondary" onClick={() => dispatch({ type: 'CHANGE_PAGE', page: PAGES.products })}>Products</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={4} justify="flex-end">
                <Grid item>
                  <Badge badgeContent={Object.keys(basket).length} color="default">
                    <Button onClick={() => dispatch({ type: 'CHANGE_PAGE', page: PAGES.basket })}>Basket</Button>
                  </Badge>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.root}>
        {renderPage(page)}
      </div>
    </Provider>
  );
}

export default connect(({ page, basket }) => ({
  page,
  basket: basket?.list || {}
}))(App);
