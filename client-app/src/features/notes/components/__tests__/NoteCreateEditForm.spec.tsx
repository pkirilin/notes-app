import { fireEvent } from '@testing-library/dom';
import React from 'react';
import {
  asJestMock,
  renderConnected,
  RenderConnectedResult,
  waitForSingleCall,
} from '../../../../test-utils';
import { NotesActions, NotesActionTypes } from '../../actions';
import api from '../../api';
import NoteCreateEditForm from '../NoteCreateEditForm';

jest.mock('../../api');

describe('<NoteCreateEditForm></NoteCreateEditForm>', () => {
  describe('when filled new note text and clicked submit button', () => {
    test('should create note and clear input', async () => {
      const api = mockCreateNoteApi('Some note');

      const result = renderConnected(
        <NoteCreateEditForm></NoteCreateEditForm>,
        withDraftedNoteState(),
      );
      fillNoteText(result, 'Test note');
      clickSubmit(result);
      await waitForSingleCall(api);

      expect(result.getByPlaceholderText('Enter note text')).toHaveValue('');
    });
  });

  describe('when changed existing note text and clicked submit button', () => {
    test('should update note and clear input', async () => {
      const api = mockEditNoteApi();

      const result = renderConnected(
        <NoteCreateEditForm></NoteCreateEditForm>,
        withSelectedNoteState(1, 'Test note'),
      );
      fillNoteText(result, 'Updated note');
      clickSubmit(result);
      await waitForSingleCall(api);

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

function mockCreateNoteApi(noteText: string) {
  return asJestMock(api.createNote).mockResolvedValueOnce({
    id: 1,
    text: noteText,
    createdAt: '2021-05-01',
    updatedAt: '2021-05-02',
  });
}

function mockEditNoteApi(noteText = '') {
  return asJestMock(api.editNote).mockResolvedValueOnce({
    id: 1,
    text: noteText,
    createdAt: '2021-05-01',
    updatedAt: '2021-05-02',
  });
}

function fillNoteText(
  { getByPlaceholderText }: RenderConnectedResult,
  text: string,
) {
  fireEvent.change(getByPlaceholderText('Enter note text'), {
    target: { value: text },
  });
}

function clickSubmit({ getByRole }: RenderConnectedResult) {
  fireEvent.click(getByRole('submit'));
}

function clickCancel({ getByText }: RenderConnectedResult) {
  fireEvent.click(getByText('Cancel'));
}

function withSelectedNoteState(id: number, text: string): NotesActions[] {
  return [
    {
      type: NotesActionTypes.SelectNote,
      payload: {
        id,
        text,
        createdAt: '2021-05-01',
        updatedAt: '2021-05-02',
      },
    },
  ];
}

function withDraftedNoteState() {
  return [
    {
      type: NotesActionTypes.Draft,
    },
  ];
}
