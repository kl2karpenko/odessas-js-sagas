import React  from 'react';
import { connect, useDispatch } from 'react-redux';

import { Button, Grid, Typography } from '@material-ui/core';

import ProductsList from './products-list';

function Products() {
  const dispatch = useDispatch();

  return (
   <Grid container>
     <Grid item xs={12}>
       <Typography variant={"h4"}>Get a list of products, and start shopping!</Typography>
     </Grid>

     <Grid item xs={12}>
       <Grid container spacing={4} alignItems={"center"}>
         <Grid item>
           <Button variant="contained" color="primary" onClick={() => dispatch({
             type: 'PRODUCTS_FETCH_REQUESTED'
           })}>Get all products</Button>
         </Grid>
       </Grid>
     </Grid>

     <Grid item xs={12}>
       <ProductsList />
     </Grid>
   </Grid>
  );
}

export default connect(null, {})(Products);