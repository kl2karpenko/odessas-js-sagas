import React  from 'react';
import {connect, useSelector} from 'react-redux';

import { Grid, Avatar, Typography } from '@material-ui/core';

import ProductsButton from './products-button';

function ProductsList() {
  const list = useSelector(state => state.products?.list || [])
  if (list.length === 0) return null;

  return (
    <div style={{ paddingTop: 30 }}>
      <Typography variant={"h4"}>All shops</Typography>
      <Grid container spacing={4}>
        {list.map(({ name, img, id }) => (
          <Grid key={id} item xs={3} md={4}>
            <Avatar alt="Remy Sharp" src={img} />

            <Typography variant={"h5"}>
              {name}
            </Typography>

            <ProductsButton product={{ name, img, id }} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ProductsList;