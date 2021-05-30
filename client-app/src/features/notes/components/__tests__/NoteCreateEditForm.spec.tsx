import React from 'react';
import { renderConnected, waitForSingleCall } from '../../../../test-utils';
import {
  clickCancelNoteInput,
  clickSubmitNote,
  fillNoteText,
  mockCreateNoteApi,
  mockEditNoteApi,
  withDraftedNoteState,
  withSelectedNoteState,
} from '../../testing';
import NoteCreateEditForm from '../NoteCreateEditForm';

jest.mock('../../api');

describe('<NoteCreateEditForm></NoteCreateEditForm>', () => {
  describe('when note was created', () => {
    test('should clear note selection', async () => {
      const createNote = mockCreateNoteApi('Some note');

      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>, withDraftedNoteState());
      fillNoteText(result, 'Test note');
      clickSubmitNote(result);
      await waitForSingleCall(createNote);

      expect(result.getByText('Select note')).toBeVisible();
    });
  });

  describe('when note was edited', () => {
    test('should clear note selection', async () => {
      const editNote = mockEditNoteApi();

      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>, withSelectedNoteState(1, 'Test note'));
      fillNoteText(result, 'Updated note');
      clickSubmitNote(result);
      await waitForSingleCall(editNote);

      expect(result.getByText('Select note')).toBeVisible();
    });
  });

  describe('when selected note changed', () => {
    test('should update note text field', () => {
      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>, withSelectedNoteState(1, 'Test note'));

      expect(result.getByPlaceholderText('Enter note text')).toHaveValue('Test note');
    });
  });

  describe('when note input is canceled', () => {
    test('should clear note selection if note was drafted', () => {
      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>, withDraftedNoteState());
      clickCancelNoteInput(result);

      expect(result.getByText('Select note')).toBeVisible();
    });

    test('should clear note selection if note was edited', () => {
      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>, withSelectedNoteState(1, 'Note'));
      clickCancelNoteInput(result);

      expect(result.getByText('Select note')).toBeVisible();
    });
  });

  describe('when note text area is empty', () => {
    test('should disable submit button if creating new note', () => {
      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>, withDraftedNoteState());
      fillNoteText(result, '');

      expect(result.getByRole('submit').getAttribute('disabled')).not.toBeNull();
    });

    test('should disable submit button if editing note', () => {
      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>, withSelectedNoteState(1, 'Note 1'));
      fillNoteText(result, '');

      expect(result.getByRole('submit').getAttribute('disabled')).not.toBeNull();
    });
  });
});
