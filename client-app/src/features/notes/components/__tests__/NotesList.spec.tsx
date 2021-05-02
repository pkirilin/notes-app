import { fireEvent } from '@testing-library/dom';
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

  describe('when delete button clicked for specific note', () => {
    test('should delete that note', async () => {
      const getNotes = mockSuccessfulGetNotes('Note 1', 'Note 2', 'Note 3');
      const deleteNote = mockSuccessfulDeleteNote();

      const result = renderConnected(<NotesList></NotesList>);
      await waitForSingleCall(getNotes);
      await clickDelete(result, 1);
      await waitForSingleCall(deleteNote);

      expect(result.getByText('Note 1')).toBeVisible();
      expect(result.queryByText('Note 2')).toBeNull();
      expect(result.getByText('Note 3')).toBeVisible();
    });
  });
});

function mockSuccessfulGetNotes(...noteTexts: string[]) {
  return asJestMock(api.getNotes).mockResolvedValueOnce(
    noteTexts.map((text, i) => ({
      id: i,
      text,
    })),
  );
}

function mockSuccessfulDeleteNote() {
  return asJestMock(api.deleteNote).mockResolvedValue();
}

async function clickDelete(result: RenderResult, elementIndex: number) {
  const buttons = await result.findAllByRole('deletion');
  fireEvent.click(buttons[elementIndex]);
}
