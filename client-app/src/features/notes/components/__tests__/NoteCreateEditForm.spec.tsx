import { fireEvent } from '@testing-library/dom';
import React from 'react';
import {
  asJestMock,
  renderConnected,
  RenderConnectedResult,
  waitForSingleCall,
} from '../../../../test-utils';
import api from '../../api';
import { NoteListItem } from '../../models/NoteListItem';
import NoteCreateEditForm from '../NoteCreateEditForm';

jest.mock('../../api');

describe('NoteCreateEditForm', () => {
  describe('when filled new note text and clicked submit button', () => {
    test('should create note and clear input', async () => {
      const apiMock = setupCreatedNoteFromApi({ id: 11, text: 'Test note' });

      const renderResult = renderConnected(
        <NoteCreateEditForm></NoteCreateEditForm>,
      );
      fillNoteTextAndClickSubmit(renderResult, 'Test note');
      await waitForSingleCall(apiMock);

      expect(renderResult.queryByText('Test note')).toBeNull();
    });
  });
});

function setupCreatedNoteFromApi(note: NoteListItem) {
  return asJestMock(api.createNote).mockResolvedValue(note);
}

function fillNoteTextAndClickSubmit(
  { getByPlaceholderText, getByRole }: RenderConnectedResult,
  text: string,
) {
  fireEvent.change(getByPlaceholderText('Enter note text'), {
    target: { value: text },
  });
  fireEvent.click(getByRole('submit'));
}
