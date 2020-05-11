import React  from 'react';
import { connect, useDispatch } from 'react-redux';

import { makeStyles, Button, Grid, Typography } from '@material-ui/core';

import ShopsList from './shops-list';

function Shops({}) {
  const dispatch = useDispatch();

  return (
   <Grid container>
     <Grid item xs={12}>
       <Typography variant={"h4"}>Get a lists of shops right now, and start shopping!</Typography>
     </Grid>

     <Grid item xs={12}>
       <Grid container spacing={4}>
         <Grid item>
           <Button variant="contained" color="primary" onClick={() => dispatch({
             type: 'SHOPS_FETCH_REQUESTED'
           })}>Get all shops</Button>
         </Grid>
         <Grid item>
           <Button variant="contained" color="primary" onClick={() => dispatch({
             type: 'SHOPS_REMOVE'
           })}>Remove all shops</Button>
         </Grid>
       </Grid>
     </Grid>

     <Grid item xs={12}>
       <ShopsList />
     </Grid>

   </Grid>
  );
}

export default connect(null, {})(Shops);