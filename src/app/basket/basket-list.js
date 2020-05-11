import React, { useState }  from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  Checkbox,
  Avatar,
  Typography,
  Button,
  Grid
} from '@material-ui/core';

function BasketList({ list }) {
  const dispatch = useDispatch();
  const goods = Object.values(list);
  const [selected, setSelected] = useState({});

  if (Object.keys(list).length === 0) return null;

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
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant={"h4"}>All your products</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button color={"primary"} variant={"contained"} onClick={() => setSelected({})}>
                Remove All
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {goods.map(({ name, img, id }) => (
          <Grid key={id} item xs={12}>
            <Grid container spacing={4}>
              <Grid item>
                <Checkbox
                  checked={!!selected[id]}
                  onChange={e => handleChange(e, { name, img, id })}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
              <Grid item>
                <Avatar alt="Remy Sharp" src={img} />
              </Grid>
              <Grid item xs={4}>
                <Typography variant={"h5"}>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button color={"primary"} variant={"contained"} onClick={() => dispatch({
                  type: "BASKET_REMOVE_PRODUCT",
                  product: { name, img, id }
                })}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default connect(null, {})(BasketList);