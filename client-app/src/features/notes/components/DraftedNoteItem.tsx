import React from 'react';
import {
  FlexContainer,
  ListItem,
  Typography,
} from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';

const DraftedNoteItem: React.FC = () => {
  const draftedNote = useTypedSelector(state => state.notes.draftedNote);

  if (!draftedNote) {
    return null;
  }

  return (
    <ListItem>
      <FlexContainer direction="column" spacing="md">
        <Typography type="caption" color="hint">
          Draft
        </Typography>
        {draftedNote.text ? (
          <Typography color="default">{draftedNote.text}</Typography>
        ) : (
          <Typography color="hint">
            <i>Enter note text</i>
          </Typography>
        )}
      </FlexContainer>
    </ListItem>
  );
};

export default DraftedNoteItem;
