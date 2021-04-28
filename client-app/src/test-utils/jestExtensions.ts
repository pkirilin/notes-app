import { waitFor } from '@testing-library/dom';
import { UserData } from '../features/auth/models';
import api from '../features/notes/api';
import auth from '../features/auth/api';
import { NoteListItem } from '../features/notes/models/NoteListItem';

export function asJestMock<TResult>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: (...args: any[]) => TResult,
): jest.Mock<TResult> {
  return func as jest.Mock<TResult>;
}

export function waitForSingleCall(fn: jest.Mock): Promise<void> {
  return waitFor(() => expect(fn).toHaveBeenCalledTimes(1));
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

export function setupFakeLoginApi(): jest.Mock<Promise<UserData>> {
  return asJestMock(auth.login).mockResolvedValueOnce({
    userId: 1,
    userName: 'user',
    token: '',
    tokenExpirationInDays: 1,
  });
}

export function setupFakeRegisterApi(): jest.Mock<Promise<void>> {
  return asJestMock(auth.register).mockResolvedValueOnce();
}
