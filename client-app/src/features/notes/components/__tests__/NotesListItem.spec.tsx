import React from 'react';
import { renderConnected } from '../../../../test-utils';
import { mockDeleteNoteApi, clickDeleteNote, createTestNote } from '../../testHelpers';
import NotesListItem from '../NotesListItem';

jest.mock('../../api');

describe('<NotesListItem></NotesListItem>', () => {
  describe('when delete clicked and confirmed deletion', () => {
    test('should delete note', async () => {
      const deleteNoteApi = mockDeleteNoteApi();

      const result = renderConnected(<NotesListItem note={createTestNote()}></NotesListItem>);
      clickDeleteNote(result);
      clickDeleteNote(result);

      expect(deleteNoteApi).toHaveBeenCalledTimes(1);
    });
  });
});
