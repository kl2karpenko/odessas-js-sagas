import React  from 'react';
import { connect, useDispatch } from 'react-redux';

import { ListItemAvatar, Avatar, List, ListItem, Typography, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
import { Work as WorkIcon } from '@material-ui/icons';

import { PAGES } from '../../store/pages/pages-reducer'

function StoresList({ list }) {
  const dispatch = useDispatch();

  if (list.length === 0) return null;

  return (
    <div style={{ paddingTop: 30 }}>
      <Typography variant={"h4"}>All shops</Typography>
      <List>
        {list.map(({ name, id }) => (
          <ListItem key={id}>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
            <ListItemSecondaryAction>
              <Button color={"secondary"} variant={"contained"} onClick={() => dispatch({ type: 'CHANGE_PAGE', page: PAGES.products })}>
                Shop now!
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default connect(({ store } = {}) => ({
  list: store?.list || []
}), {})(StoresList);