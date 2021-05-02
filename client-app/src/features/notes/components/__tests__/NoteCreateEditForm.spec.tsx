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
import { NoteListItem } from '../../models/NoteListItem';
import NoteCreateEditForm from '../NoteCreateEditForm';

jest.mock('../../api');

describe('<NoteCreateEditForm></NoteCreateEditForm>', () => {
  describe('when filled new note text and clicked submit button', () => {
    test('should create note and clear input', async () => {
      const api = mockCreateNoteApi({ id: 11, text: 'Test note' });

      const result = renderConnected(<NoteCreateEditForm></NoteCreateEditForm>);
      fillNoteText(result, 'Test note');
      clickSubmit(result);
      await waitForSingleCall(api);

      expect(result.queryByText('Test note')).toBeNull();
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

      expect(result.queryByText('Updated note')).toBeNull();
    });
  });
});

function mockCreateNoteApi(note: NoteListItem) {
  return asJestMock(api.createNote).mockResolvedValueOnce(note);
}

function mockEditNoteApi() {
  return asJestMock(api.editNote).mockResolvedValueOnce();
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

function withSelectedNoteState(id: number, text: string): NotesActions[] {
  return [
    {
      type: NotesActionTypes.SelectNote,
      payload: {
        id,
        text,
      },
    },
  ];
}
