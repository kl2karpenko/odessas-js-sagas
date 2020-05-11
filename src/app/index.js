import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core'
import { Provider, connect } from 'react-redux';

import { Shops } from './shops';

import store from '../store';
const useStyles = makeStyles({
  root: {
    padding: 20
  }
})

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <Shops />
      </div>
    </Provider>
  );
}

export default connect()(App);
