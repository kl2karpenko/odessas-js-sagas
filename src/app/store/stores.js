import React  from 'react';
import { connect, useDispatch } from 'react-redux';

import { Button, Grid, Typography } from '@material-ui/core';

import StoresList from './stores-list';

function Stores() {
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
             type: 'STORES_FETCH_REQUESTED'
           })}>Get all shops</Button>
         </Grid>
         <Grid item>
           <Button variant="contained" color="primary" onClick={() => dispatch({
             type: 'STORES_REMOVE'
           })}>Remove all shops</Button>
         </Grid>
       </Grid>
     </Grid>

     <Grid item xs={12}>
       <StoresList />
     </Grid>

   </Grid>
  );
}

export default connect(null, {})(Stores);