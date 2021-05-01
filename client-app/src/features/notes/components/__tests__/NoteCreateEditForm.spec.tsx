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

describe('<NoteCreateEditForm></NoteCreateEditForm>', () => {
  describe('when filled new note text and clicked submit button', () => {
    test('should create note and clear input', async () => {
      const apiMock = setupCreatedNoteFromApi({ id: 11, text: 'Test note' });

      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>);
      fillNoteText(result, 'Test note');
      clickSubmit(result);
      await waitForSingleCall(apiMock);

      expect(result.queryByText('Test note')).toBeNull();
    });
  });
});

function setupCreatedNoteFromApi(note: NoteListItem) {
  return asJestMock(api.createNote).mockResolvedValue(note);
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
