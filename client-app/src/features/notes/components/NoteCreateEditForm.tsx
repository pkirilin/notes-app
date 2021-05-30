import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, FlexContainer, TextArea, Typography } from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { createNoteRequest, draftCanceled, draftChanged, editNoteRequest, noteSelectionCanceled } from '../actions';

const SelectNotePlaceholder = styled.div`
  width: 100%;

  & > * {
    margin: ${props => props.theme.sizing.lg} 0;
  }
`;

const NoteCreateEditForm: React.FC = () => {
  const selectedNote = useTypedSelector(state => state.notes.selectedNote);
  const draftedNote = useTypedSelector(state => state.notes.draftedNote);
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    setNoteText(selectedNote ? selectedNote.text : '');
  }, [selectedNote]);

  useEffect(() => {
    setIsSubmitDisabled(noteText === '');
  }, [noteText]);

  const handleNoteTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.target.value);

    if (draftedNote) {
      dispatch(draftChanged(event.target.value));
    }
  };

  const handleSubmitClick = () => {
    if (draftedNote) {
      dispatch(createNoteRequest({ text: draftedNote.text }));
    } else if (selectedNote) {
      dispatch(editNoteRequest(selectedNote.id, { text: noteText }));
    }
  };

  const handleCancelClick = () => {
    if (draftedNote) {
      dispatch(draftCanceled());
    } else if (selectedNote) {
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
      <TextArea rows={5} placeholder="Enter note text" value={noteText} onChange={handleNoteTextChange}></TextArea>
      <FlexContainer justify="flex-end" spacing="md">
        <Button color="primary" role="submit" disabled={isSubmitDisabled} onClick={handleSubmitClick}>
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
