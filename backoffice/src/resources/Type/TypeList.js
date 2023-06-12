import React from 'react';
import { List, SimpleList } from 'react-admin';
import StyleIcon from '@mui/icons-material/Style';

const TypeList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record.type}
      leftAvatar={() => <StyleIcon />}
    />
  </List>
);

export default TypeList;
