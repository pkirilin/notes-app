import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../app/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { createNoteRequest, editNoteRequest } from '../actions';

const NoteCreateEditForm: React.FC = () => {
  const status = useTypedSelector(state => state.notes.status);
  const selectedNote = useTypedSelector(state => state.notes.selectedNote);
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState(
    selectedNote ? selectedNote.text : '',
  );

  useEffect(() => {
    if (status === 'note created' || status === 'note updated') {
      setNoteText('');
    }
  }, [status]);

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
    <div>
      <textarea
        placeholder="Enter note text"
        value={noteText}
        onChange={handleNoteTextChange}
      ></textarea>
      <Button role="submit" onClick={handleSubmitClick}>
        {selectedNote ? 'Edit' : 'Add'}
      </Button>
    </div>
  );
};

export default NoteCreateEditForm;
