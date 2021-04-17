import React from 'react';
import { List, ListItem } from 'features/__shared__/components';

const NotesList: React.FC = () => {
  return (
    <List>
      <ListItem>Note 1</ListItem>
      <ListItem>Note 2</ListItem>
    </List>
  );
};

export default NotesList;
