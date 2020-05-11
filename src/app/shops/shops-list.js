import React  from 'react';
import { connect } from 'react-redux';

import { ListItemAvatar, Avatar, List, ListItem, Typography, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
import { Work as WorkIcon } from '@material-ui/icons';

function ShopsList({ list }) {
  if (list.length === 0) return null;

  return (
    <div style={{ paddingTop: 30 }}>
      <Typography variant={"h4"}>All shops</Typography>
      <List>
        {list.map(({ name }) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
            <ListItemSecondaryAction>
              <Button color={"secondary"} variant={"contained"}>
                Shop now!
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default connect(({ shop } = {}) => ({
  list: shop?.list || []
}), {})(ShopsList);