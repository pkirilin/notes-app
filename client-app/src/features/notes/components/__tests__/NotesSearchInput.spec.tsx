import React from 'react';
import { renderConnected, waitForSingleCall } from '../../../../test-utils';
import { fillSearchTerm, clickSearchClear, mockGetNotesApi, mockSearchApi } from '../../testHelpers';
import NotesSearchInput from '../NotesSearchInput';

jest.mock('../../api');

describe('<NotesSearchInput></NotesSearchInput>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when valid search term entered multiple times within debounce time', () => {
    test('should call search api only once', async () => {
      const searchApi = mockSearchApi();

      const result = renderConnected(<NotesSearchInput></NotesSearchInput>);
      fillSearchTerm(result, 'tes');
      fillSearchTerm(result, 'test');
      await waitForSingleCall(searchApi);

      expect(searchApi).toHaveBeenCalledTimes(1);
      expect(searchApi).toHaveBeenLastCalledWith('test');
    });
  });

  describe('when search term of length less than 3 entered', () => {
    test('should not search notes', async () => {
      const searchApi = mockSearchApi();

      const result = renderConnected(<NotesSearchInput></NotesSearchInput>);
      fillSearchTerm(result, 'te');
      await sleep(400);

      expect(searchApi).not.toHaveBeenCalled();
    });
  });

  describe('when clear search input clicked', () => {
    test('should clear search term and call search api', async () => {
      const searchApi = mockSearchApi();
      const getNotesApi = mockGetNotesApi();

      const result = renderConnected(<NotesSearchInput></NotesSearchInput>);
      fillSearchTerm(result, 'test');
      await waitForSingleCall(searchApi);
      clickSearchClear(result);
      await waitForSingleCall(getNotesApi);

      expect(searchApi).toHaveBeenLastCalledWith('test');
    });
  });
});

async function sleep(timeout: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
