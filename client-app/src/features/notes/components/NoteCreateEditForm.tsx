import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FlexContainer, TextArea } from '../../__shared__/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { createNoteRequest, editNoteRequest } from '../actions';

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
  };

  const handleSubmitClick = () => {
    if (selectedNote) {
      dispatch(editNoteRequest(selectedNote.id, { text: noteText }));
    } else {
      dispatch(createNoteRequest({ text: noteText }));
    }
  };

  return (
    <FlexContainer grow={1} direction="column" spacing="md">
      <TextArea
        rows={5}
        placeholder="Enter note text"
        value={noteText}
        onChange={handleNoteTextChange}
      ></TextArea>
      <FlexContainer justify="flex-end">
        <Button role="submit" onClick={handleSubmitClick}>
          {selectedNote ? 'Edit' : 'Add'}
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
};

export default NoteCreateEditForm;
