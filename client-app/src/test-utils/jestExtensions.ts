import api from 'features/notes/api';

export function asJestMock<TResult>(
  func: (...args: unknown[]) => TResult,
): jest.Mock<TResult> {
  return func as jest.Mock<TResult>;
}

export function setupNotesFromApi(...noteTexts: string[]): void {
  asJestMock(api.getNotes).mockResolvedValue(
    noteTexts.map((text, i) => ({
      id: i,
      text,
    })),
  );
}
