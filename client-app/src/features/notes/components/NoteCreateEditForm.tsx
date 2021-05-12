import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  Button,
  FlexContainer,
  TextArea,
  Typography,
} from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import {
  createNoteRequest,
  draftCanceled,
  draftChanged,
  editNoteRequest,
  noteSelectionCanceled,
} from '../actions';

const SelectNotePlaceholder = styled.div`
  width: 100%;

  & > * {
    margin: ${props => props.theme.sizing.lg} 0;
  }
`;

const NoteCreateEditForm: React.FC = () => {
  const status = useTypedSelector(state => state.notes.status);
  const selectedNote = useTypedSelector(state => state.notes.selectedNote);
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (status === 'note created' || status === 'note updated') {
      setNoteText('');
    }
  }, [status]);

  useEffect(() => {
    setNoteText(selectedNote ? selectedNote.text : '');
  }, [selectedNote]);

  const handleNoteTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNoteText(event.target.value);

    if (selectedNote && selectedNote.id) {
      dispatch(draftChanged(event.target.value));
    }
  };

  const handleSubmitClick = () => {
    if (selectedNote && selectedNote.id) {
      dispatch(editNoteRequest(selectedNote.id, { text: noteText }));
    } else {
      dispatch(createNoteRequest({ text: noteText }));
    }
  };

  const handleCancelClick = () => {
    if (selectedNote && selectedNote.id) {
      dispatch(draftCanceled());
    } else {
      dispatch(noteSelectionCanceled());
    }
  };

  if (selectedNote === null) {
    return (
      <SelectNotePlaceholder>
        <Typography type="subtitle" align="center" color="hint">
          Select note
        </Typography>
      </SelectNotePlaceholder>
    );
  }

  return (
    <FlexContainer flex={1} direction="column" spacing="md">
      <TextArea
        rows={5}
        placeholder="Enter note text"
        value={noteText}
        onChange={handleNoteTextChange}
      ></TextArea>
      <FlexContainer justify="flex-end" spacing="md">
        <Button color="primary" role="submit" onClick={handleSubmitClick}>
          {selectedNote ? 'Save' : 'Create'}
        </Button>
        <Button role="cancel" onClick={handleCancelClick}>
          Cancel
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
};

export default NoteCreateEditForm;
