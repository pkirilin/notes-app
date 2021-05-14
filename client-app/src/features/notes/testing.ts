import { fireEvent, RenderResult } from '@testing-library/react';
import { asJestMock } from '../../test-utils';
import { NotesActions, NotesActionTypes } from './actions';
import api from './api';
import { NoteListItem } from './models/NoteListItem';

export const MOCK_DATE = '2021-05-11T22:24:35';

export function withSelectedNoteState(
  id: number,
  text: string,
): NotesActions[] {
  return [
    {
      type: NotesActionTypes.SelectNote,
      payload: {
        id,
        text,
        createdAt: '2021-05-01',
        updatedAt: '2021-05-02',
      },
    },
  ];
}

export function withDraftedNoteState(): NotesActions[] {
  return [
    {
      type: NotesActionTypes.Draft,
    },
  ];
}

// export function withNoteItemsState(...noteTexts: string[]): NotesActions[] {
//   return [
//     {
//       type: NotesActionTypes.GetNotesSuccess,
//       payload: noteTexts.map((text, id) => ({
//         id,
//         text,
//         createdAt: MOCK_DATE,
//         updatedAt: MOCK_DATE,
//       })),
//     },
//   ];
// }

export function mockCreateNoteApi(
  noteText: string,
  id = 1,
): jest.Mock<Promise<NoteListItem>> {
  return asJestMock(api.createNote).mockResolvedValueOnce({
    id,
    text: noteText,
    createdAt: '2021-05-01',
    updatedAt: '2021-05-02',
  });
}

export function mockEditNoteApi(
  noteText = '',
): jest.Mock<Promise<NoteListItem>> {
  return asJestMock(api.editNote).mockResolvedValueOnce({
    id: 1,
    text: noteText,
    createdAt: '2021-05-01',
    updatedAt: '2021-05-02',
  });
}

// TODO: refactor name
export function mockSuccessfulGetNotes(
  ...noteTexts: string[]
): jest.Mock<Promise<NoteListItem[]>> {
  return mockSuccessfulGetNotesAfter(0, ...noteTexts);
}

export function mockSuccessfulGetNotesAfter(
  startId = 0,
  ...noteTexts: string[]
): jest.Mock<Promise<NoteListItem[]>> {
  return asJestMock(api.getNotes).mockResolvedValueOnce(
    noteTexts.map((text, i) => ({
      id: i + startId,
      text,
      createdAt: MOCK_DATE,
      updatedAt: MOCK_DATE,
    })),
  );
}

export function fillNoteText(result: RenderResult, text: string): void {
  fireEvent.change(result.getByPlaceholderText('Enter note text'), {
    target: { value: text },
  });
}

export function clickSubmitNote(result: RenderResult): void {
  fireEvent.click(result.getByRole('submit'));
}

export function clickAddNote(result: RenderResult): void {
  fireEvent.click(result.getByRole('add'));
}

export function clickLoadMore(result: RenderResult): void {
  fireEvent.click(result.getByTitle('Load more notes'));
}
