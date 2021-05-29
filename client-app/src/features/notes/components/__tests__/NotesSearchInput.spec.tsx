import { fireEvent } from '@testing-library/dom';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import {
  asJestMock,
  renderConnected,
  waitForSingleCall,
} from '../../../../test-utils';
import api from '../../api';
import { mockSuccessfulGetNotes } from '../../testing';
import NotesSearchInput from '../NotesSearchInput';

jest.mock('../../api');

describe('<NotesSearchInput></NotesSearchInput>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when valid search term entered multiple times within debounce time', () => {
    test('should call search api only once', async () => {
      const searchApi = mockSuccessfulSearch();

      const result = renderConnected(<NotesSearchInput></NotesSearchInput>);
      changeSearchInput(result, 'tes');
      changeSearchInput(result, 'test');
      await waitForSingleCall(searchApi);

      expect(searchApi).toHaveBeenCalledTimes(1);
      expect(searchApi).toHaveBeenLastCalledWith('test');
    });
  });

  describe('when search term of length less than 3 entered', () => {
    test('should not search notes', async () => {
      const searchApi = mockSuccessfulSearch();

      const result = renderConnected(<NotesSearchInput></NotesSearchInput>);
      changeSearchInput(result, 'te');
      // TODO: use mock timers
      await sleep(400);

      expect(searchApi).not.toHaveBeenCalled();
    });
  });

  describe('when clear search input clicked', () => {
    test('should clear search term and call search api', async () => {
      const searchApi = mockSuccessfulSearch();
      const getNotesApi = mockSuccessfulGetNotes();

      const result = renderConnected(<NotesSearchInput></NotesSearchInput>);
      changeSearchInput(result, 'test');
      await waitForSingleCall(searchApi);
      clickSearchClear(result);
      await waitForSingleCall(getNotesApi);

      expect(searchApi).toHaveBeenLastCalledWith('test');
    });
  });
});

function mockSuccessfulSearch(...noteTexts: string[]) {
  return asJestMock(api.searchNotes).mockResolvedValue(
    noteTexts.map((text, i) => ({
      id: i,
      text,
      createdAt: '2021-05-11',
      updatedAt: '2021-05-11',
    })),
  );
}

async function sleep(timeout: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

function changeSearchInput(result: RenderResult, term: string) {
  fireEvent.change(result.getByPlaceholderText('Search notes'), {
    target: { value: term },
  });
}

function clickSearchClear(result: RenderResult) {
  fireEvent.click(result.getByTitle('Clear'));
}
