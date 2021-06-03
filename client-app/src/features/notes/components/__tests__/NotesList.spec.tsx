import React from 'react';
import { renderConnected, waitForMultipleCalls, waitForSingleCall } from '../../../../test-utils';
import {
  clickAddNote,
  clickLoadMoreNotes,
  mockGetNotesApi,
  mockGetNotesApiFailed,
  mockGetNotesApiStartingFromId,
  withLoadingNoteItemsState,
} from '../../testHelpers';
import NotesList from '../NotesList';

jest.mock('../../api');
jest.mock('../../../../config');

describe('<NotesList></NotesList>', () => {
  describe('when mounted and fetched notes', () => {
    test('should render notes list', async () => {
      mockGetNotesApi('Note 1', 'Note 2');

      const { findByText } = renderConnected(<NotesList></NotesList>);

      expect(await findByText('Note 1')).toBeVisible();
      expect(await findByText('Note 2')).toBeVisible();
    });
  });

  describe('when mounted and fetched empty notes', () => {
    test('should render empty notes list message', async () => {
      const getNotesApi = mockGetNotesApi();

      const { findByText } = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotesApi);

      expect(await findByText('You have not any notes yet')).toBeVisible();
    });
  });

  describe('when mounted and fetch notes failed', () => {
    test('should display error message', async () => {
      const getNotesApi = mockGetNotesApiFailed();

      const { findByText } = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotesApi);

      expect(await findByText('Failed to get notes')).toBeVisible();
    });
  });

  describe('when add note clicked', () => {
    test('should create drafted note', async () => {
      const getNotesApi = mockGetNotesApi('Note 1', 'Note 2', 'Note 3');

      const result = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotesApi);
      clickAddNote(result);

      expect(result.getByText('Draft')).toBeVisible();
    });
  });

  describe('when load more clicked', () => {
    test('should append notes from next page to notes list', async () => {
      const getNotesApi = mockGetNotesApi('Note 1', 'Note 2');
      mockGetNotesApiStartingFromId(2, 'Note 3', 'Note 4');

      const result = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotesApi);
      clickLoadMoreNotes(result);

      expect(await result.findByText('Note 1')).toBeVisible();
      expect(await result.findByText('Note 2')).toBeVisible();
      expect(await result.findByText('Note 3')).toBeVisible();
      expect(await result.findByText('Note 4')).toBeVisible();
    });
  });

  describe('when load more clicked and all notes are loaded', () => {
    test('should hide load more icon', async () => {
      const getNotesApi = mockGetNotesApi('Note 1', 'Note 2');
      mockGetNotesApiStartingFromId(2, 'Note 3');

      const result = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotesApi);
      clickLoadMoreNotes(result);
      await waitForMultipleCalls(getNotesApi, 2);

      expect(result.queryByTitle('Load more notes')).toBeNull();
    });
  });

  describe('when notes are loading', () => {
    test('should display loading message', () => {
      mockGetNotesApi();

      const result = renderConnected(<NotesList></NotesList>, withLoadingNoteItemsState());

      expect(result.getByText(/Loading notes/)).toBeVisible();
    });
  });
});
