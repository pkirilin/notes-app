import { fireEvent } from '@testing-library/dom';
import React from 'react';
import {
  asJestMock,
  renderConnected,
  RenderConnectedResult,
} from '../../../../test-utils';
import api from '../../api';
import { NoteListItem } from '../../models/NoteListItem';
import NotesListItem from '../NotesListItem';

jest.mock('../../api');

describe('when delete clicked and confirmed deletion', () => {
  test('should delete note', async () => {
    const note = createTestNote();
    const api = mockSuccessfulDeleteNote();

    const result = renderConnected(<NotesListItem note={note}></NotesListItem>);
    clickDelete(result);
    clickDelete(result);

    expect(api).toHaveBeenCalledTimes(1);
  });
});

function clickDelete({ getByRole }: RenderConnectedResult) {
  fireEvent.click(getByRole('deletion'));
}

function createTestNote(): NoteListItem {
  return {
    id: 1,
    text: 'Test note',
    createdAt: '2021-05-01',
    updatedAt: '2021-05-01',
  };
}

function mockSuccessfulDeleteNote() {
  return asJestMock(api.deleteNote).mockResolvedValue();
}
