import React from 'react';
import { renderConnected, waitForSingleCall } from '../../../../test-utils';
import {
  mockEditNoteApi,
  fillNoteText,
  clickSubmitNote,
  mockSuccessfulGetNotes,
  withSelectedNoteState,
  mockCreateNoteApi,
  withDraftedNoteState,
} from '../../testing';
import NotesPage from '../NotesPage';

jest.mock('../../api');
jest.mock('../../../../config');

describe('<NotesPage></NotesPage>', () => {
  describe('when note submitted', () => {
    test('should edit note if note was selected', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      mockEditNoteApi('Some text from API');

      const result = renderConnected(
        <NotesPage></NotesPage>,
        withSelectedNoteState(1, 'Note 1'),
      );
      await waitForSingleCall(getNotes);
      fillNoteText(result, 'Some text');
      clickSubmitNote(result);

      expect(await result.findByText('Some text from API')).toBeVisible();
    });

    test('should create note if note was drafted', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      mockCreateNoteApi('New note from API', 10);

      const result = renderConnected(
        <NotesPage></NotesPage>,
        withDraftedNoteState(),
      );
      await waitForSingleCall(getNotes);
      fillNoteText(result, 'Some text');
      clickSubmitNote(result);

      expect(await result.findByText('New note from API')).toBeVisible();
    });

    test('should clear note selection and remove draft if note was drafted', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      const createNote = mockCreateNoteApi('New note from API', 10);

      const result = renderConnected(
        <NotesPage></NotesPage>,
        withDraftedNoteState(),
      );
      await waitForSingleCall(getNotes);
      fillNoteText(result, 'Some text');
      clickSubmitNote(result);
      await waitForSingleCall(createNote);

      expect(result.queryByText('Draft')).toBeNull();
    });
  });
});
