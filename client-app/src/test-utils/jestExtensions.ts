import api from 'features/notes/api';
import { NoteListItem } from 'features/notes/models/NoteListItem';

export function asJestMock<TResult>(
  func: (...args: unknown[]) => TResult,
): jest.Mock<TResult> {
  return func as jest.Mock<TResult>;
}

export function setupNotesFromApi(
  ...noteTexts: string[]
): jest.Mock<Promise<NoteListItem[]>> {
  return asJestMock(api.getNotes).mockResolvedValueOnce(
    noteTexts.map((text, i) => ({
      id: i,
      text,
    })),
  );
}
