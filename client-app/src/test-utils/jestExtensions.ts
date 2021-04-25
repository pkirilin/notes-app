import { waitFor } from '@testing-library/dom';
import api from 'features/notes/api';
import { NoteListItem } from 'features/notes/models/NoteListItem';

export function asJestMock<TResult>(
  func: (...args: unknown[]) => TResult,
): jest.Mock<TResult> {
  return func as jest.Mock<TResult>;
}

export function setupFakeNotesFromApi(
  ...noteTexts: string[]
): jest.Mock<Promise<NoteListItem[]>> {
  return asJestMock(api.getNotes).mockResolvedValueOnce(
    noteTexts.map((text, i) => ({
      id: i,
      text,
    })),
  );
}

export function waitForSingleCall(fn: jest.Mock): Promise<void> {
  return waitFor(() => expect(fn).toHaveBeenCalledTimes(1));
}

// arrange().fakeNotesFromApi()

// waitFor().singleCall(fn)
