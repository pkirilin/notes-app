import { fireEvent, waitFor } from '@testing-library/dom';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import {
  asJestMock,
  renderConnected,
  waitForSingleCall,
} from '../../../../test-utils';
import api from '../../api';
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

  describe('when add note clicked', () => {
    test('should create drafted note', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');

      const result = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotes);
      clickAddNote(result);

      expect(result.getByText('Draft')).toBeVisible();
    });
  });

  describe('when load more clicked', () => {
    test('should append notes from next page to notes list', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2');
      mockSuccessfulLoadMoreNotes(2, 'Note 3', 'Note 4');

      const result = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotes);
      clickLoadMore(result);

      expect(await result.findByText('Note 1')).toBeVisible();
      expect(await result.findByText('Note 2')).toBeVisible();
      expect(await result.findByText('Note 3')).toBeVisible();
      expect(await result.findByText('Note 4')).toBeVisible();
      expect(getNotes).toHaveBeenLastCalledWith(1);
    });
  });

  describe('when all notes are loaded', () => {
    test('should hide load more icon', async () => {
      const getNotes = mockSuccessfulGetNotes(
        'Note 1',
        'Note 2',
      ).mockResolvedValueOnce([]);

      const result = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotes);
      clickLoadMore(result);
      await waitFor(() => expect(getNotes).toHaveBeenCalledTimes(2));

      expect(result.queryByTitle('Load more notes')).toBeNull();
    });
  });
});

function mockSuccessfulGetNotes(...noteTexts: string[]) {
  return asJestMock(api.getNotes).mockResolvedValueOnce(
    noteTexts.map((text, i) => ({
      id: i,
      text,
      createdAt: '2021-05-09',
      updatedAt: '2021-05-09',
    })),
  );
}

function mockSuccessfulLoadMoreNotes(startIndex = 0, ...noteTexts: string[]) {
  return asJestMock(api.getNotes).mockResolvedValueOnce(
    noteTexts.map((text, i) => ({
      id: startIndex + i,
      text,
      createdAt: '2021-05-09',
      updatedAt: '2021-05-09',
    })),
  );
}

function clickAddNote(result: RenderResult) {
  fireEvent.click(result.getByRole('add'));
}

function clickLoadMore(result: RenderResult) {
  fireEvent.click(result.getByTitle('Load more notes'));
}
