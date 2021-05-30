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
  mockDeleteNote,
  clickDeleteNoteById,
  clickCancelNoteInput,
} from '../../testing';
import NotesPage from '../NotesPage';

jest.mock('../../api');
jest.mock('../../../../config');

describe('<NotesPage></NotesPage>', () => {
  describe('when note is submitted', () => {
    test('should edit note if note was selected', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      mockEditNoteApi('Some text from API');

      const result = renderConnected(<NotesPage></NotesPage>, withSelectedNoteState(1, 'Note 1'));
      await waitForSingleCall(getNotes);
      fillNoteText(result, 'Some text');
      clickSubmitNote(result);

      expect(await result.findByText('Some text from API')).toBeVisible();
    });

    test('should create note if note was drafted', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      mockCreateNoteApi('New note from API', 10);

      const result = renderConnected(<NotesPage></NotesPage>, withDraftedNoteState());
      await waitForSingleCall(getNotes);
      fillNoteText(result, 'Some text');
      clickSubmitNote(result);

      expect(await result.findByText('New note from API')).toBeVisible();
    });

    test('should clear note selection and remove draft if note was drafted', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      const createNote = mockCreateNoteApi('New note from API', 10);

      const result = renderConnected(<NotesPage></NotesPage>, withDraftedNoteState());
      await waitForSingleCall(getNotes);
      fillNoteText(result, 'Some text');
      clickSubmitNote(result);
      await waitForSingleCall(createNote);

      expect(result.queryByText('Draft')).toBeNull();
    });
  });

  describe('when note input is canceled', () => {
    test('should remove draft if draft exists', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');

      const result = renderConnected(<NotesPage></NotesPage>, withDraftedNoteState());
      await waitForSingleCall(getNotes);
      clickCancelNoteInput(result);

      expect(result.queryByText('Draft')).toBeNull();
    });
  });

  describe('when note is deleted', () => {
    test('should clear note selection if deleted note was selected', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      const deleteNote = mockDeleteNote();

      const result = renderConnected(<NotesPage></NotesPage>, withSelectedNoteState(1, 'Note 2'));
      await waitForSingleCall(getNotes);
      clickDeleteNoteById(result, 1);
      clickDeleteNoteById(result, 1);
      await waitForSingleCall(deleteNote);

      expect(result.getByText('Select note')).toBeVisible();
    });

    test('should not clear note selection if other was selected', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      const deleteNote = mockDeleteNote();

      const result = renderConnected(<NotesPage></NotesPage>, withSelectedNoteState(1, 'Note 2'));
      await waitForSingleCall(getNotes);
      clickDeleteNoteById(result, 0);
      clickDeleteNoteById(result, 0);
      await waitForSingleCall(deleteNote);

      expect(result.queryByText('Select note')).toBeNull();
    });
  });
});
