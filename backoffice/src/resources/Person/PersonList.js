import React from 'react';
import { List, SimpleList } from 'react-admin';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const PersonList = () => (
  <List>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:comment']}
      leftAvatar={record => (
        <Avatar src={record['image']} width="100%">
          <PersonIcon />
        </Avatar>
      )}
      linkType="show"
    />
  </List>
);

export default PersonList;
