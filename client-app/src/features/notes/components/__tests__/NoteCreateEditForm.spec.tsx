import { fireEvent } from '@testing-library/dom';
import React from 'react';
import {
  renderConnected,
  RenderConnectedResult,
  waitForSingleCall,
} from '../../../../test-utils';
import {
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
    test('should clear input', async () => {
      const createNote = mockCreateNoteApi('Some note');

      const result = renderConnected(
        <NoteCreateEditForm></NoteCreateEditForm>,
        withDraftedNoteState(),
      );
      fillNoteText(result, 'Test note');
      clickSubmitNote(result);
      await waitForSingleCall(createNote);

      expect(result.getByPlaceholderText('Enter note text')).toHaveValue('');
    });
  });

  describe('when note was edited', () => {
    test('should clear input', async () => {
      const editNote = mockEditNoteApi();

      const result = renderConnected(
        <NoteCreateEditForm></NoteCreateEditForm>,
        withSelectedNoteState(1, 'Test note'),
      );
      fillNoteText(result, 'Updated note');
      clickSubmitNote(result);
      await waitForSingleCall(editNote);

      expect(result.getByPlaceholderText('Enter note text')).toHaveValue('');
    });
  });

  describe('when selected note changed', () => {
    test('should update note text field', () => {
      const result = renderConnected(
        <NoteCreateEditForm></NoteCreateEditForm>,
        withSelectedNoteState(1, 'Test note'),
      );

      expect(result.getByPlaceholderText('Enter note text')).toHaveValue(
        'Test note',
      );
    });
  });

  describe('when canceled input', () => {
    test('should deselect drafted note', () => {
      const result = renderConnected(
        <NoteCreateEditForm></NoteCreateEditForm>,
        withDraftedNoteState(),
      );
      clickCancel(result);

      expect(result.getByText('Select note')).toBeVisible();
    });

    test('should deselect note', () => {
      const result = renderConnected(
        <NoteCreateEditForm></NoteCreateEditForm>,
        withSelectedNoteState(1, 'Note'),
      );
      clickCancel(result);

      expect(result.getByText('Select note')).toBeVisible();
    });
  });
});

function clickCancel({ getByText }: RenderConnectedResult) {
  fireEvent.click(getByText('Cancel'));
}
