import React from 'react';
import {
  asJestMock,
  renderConnected,
  waitForSingleCall,
} from '../../../../test-utils';
import api from '../../api';
import { NoteListItem } from '../../models/NoteListItem';
import NotesList from '../NotesList';

jest.mock('../../api');

describe('<NotesList></NotesList>', () => {
  describe('when mounted and fetched notes', () => {
    test('should render notes list', async () => {
      mockSuccessfulGetNotes('Note 1', 'Note 2');

      const { findByText } = renderConnected(<NotesList></NotesList>);

      expect(await findByText('Note 1')).toBeVisible();
      expect(await findByText('Note 2')).toBeVisible();
    });
  });

  describe('when mounted and fetched empty notes', () => {
    test('should render empty notes list message', async () => {
      const api = mockSuccessfulGetNotes();

      const { findByText } = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(api);

      expect(await findByText('You have not any notes yet')).toBeVisible();
    });
  });

  describe('when mounted and fetch notes failed', () => {
    test('should display error message', async () => {
      const apiMock = asJestMock(api.getNotes).mockRejectedValueOnce({});

      const { findByText } = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(apiMock);

      expect(await findByText('Failed to get notes')).toBeVisible();
    });
  });
});

function mockSuccessfulGetNotes(
  ...noteTexts: string[]
): jest.Mock<Promise<NoteListItem[]>> {
  return asJestMock(api.getNotes).mockResolvedValueOnce(
    noteTexts.map((text, i) => ({
      id: i,
      text,
    })),
  );
}
