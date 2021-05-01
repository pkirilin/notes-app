import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../app/components';
import { useTypedSelector } from '../../__shared__/hooks';
import { createNoteRequest } from '../actions';
import { NoteListItem } from '../models/NoteListItem';

type NoteCreateEditFormProps = {
  note?: NoteListItem;
};

const NoteCreateEditForm: React.FC<NoteCreateEditFormProps> = ({
  note,
}: NoteCreateEditFormProps) => {
  const [noteText, setNoteText] = useState(note ? note.text : '');
  const status = useTypedSelector(state => state.notes.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'note created') {
      setNoteText('');
    }
  }, [status]);

  const handleNoteTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNoteText(event.target.value);
  };

  const handleAddNoteClick = () => {
    dispatch(
      createNoteRequest({
        text: noteText,
      }),
    );
  };

  return (
    <div>
      <textarea
        placeholder="Enter note text"
        value={noteText}
        onChange={handleNoteTextChange}
      ></textarea>
      <Button role="submit" onClick={handleAddNoteClick}>
        {note ? 'Edit' : 'Add'}
      </Button>
    </div>
  );
};

export default NoteCreateEditForm;
