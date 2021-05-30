import React from 'react';
import { renderConnected } from '../../../../test-utils';
import { mockDeleteNote, clickDeleteNote, createTestNote } from '../../testing';
import NotesListItem from '../NotesListItem';

jest.mock('../../api');

describe('<NotesListItem></NotesListItem>', () => {
  describe('when delete clicked and confirmed deletion', () => {
    test('should delete note', async () => {
      const note = createTestNote();
      const deleteNote = mockDeleteNote();

      const result = renderConnected(<NotesListItem note={note}></NotesListItem>);
      clickDeleteNote(result);
      clickDeleteNote(result);

      expect(deleteNote).toHaveBeenCalledTimes(1);
    });
  });
});
