import { waitFor } from '@testing-library/dom';
import React from 'react';
import { renderConnected, setupNotesFromApi } from '../../../../test-utils';
import NotesList from '../NotesList';

jest.mock('../../api');

describe('NotesList', () => {
  describe('when mounted and fetched notes', () => {
    it('should render notes list', async () => {
      const apiMock = setupNotesFromApi('Note 1', 'Note 2');

      const { getByText } = renderConnected(<NotesList></NotesList>);
      await waitFor(() => expect(apiMock).toHaveBeenCalledTimes(1));

      expect(getByText('Note 1')).toBeInTheDocument();
      expect(getByText('Note 2')).toBeInTheDocument();
    });
  });

  describe('when mounted and fetched empty notes', () => {
    it('should render empty notes list message', async () => {
      const apiMock = setupNotesFromApi();

      const { getByText } = renderConnected(<NotesList></NotesList>);
      await waitFor(() => expect(apiMock).toHaveBeenCalledTimes(1));

      expect(getByText('You have not any notes yet')).toBeInTheDocument();
    });
  });
});
