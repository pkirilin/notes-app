import { fireEvent, RenderResult } from '@testing-library/react';
import { asJestMock } from '../../test-utils';
import { NotesActions, NotesActionTypes } from './actions';
import api from './api';
import { NoteListItem } from './models/NoteListItem';

export function createTestNote(id = 1, text = 'Test note'): NoteListItem {
  const MOCK_DATE = '2021-05-11T22:24:35';
  return {
    id,
    text,
    createdAt: MOCK_DATE,
    updatedAt: MOCK_DATE,
  };
}

export function withSelectedNoteState(id: number, text: string): NotesActions[] {
  return [
    {
      type: NotesActionTypes.SelectNote,
      payload: createTestNote(id, text),
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

export function withNoteItemsState(...noteTexts: string[]): NotesActions[] {
  return [
    {
      type: NotesActionTypes.GetNotesSuccess,
      payload: noteTexts.map((text, id) => createTestNote(id, text)),
    },
  ];
}

export function withLoadingNoteItemsState(): NotesActions[] {
  return [
    {
      type: NotesActionTypes.GetNotesRequest,
    },
  ];
}

export function mockCreateNoteApi(noteText: string, id = 1): jest.Mock<Promise<NoteListItem>> {
  return asJestMock(api.createNote).mockResolvedValueOnce({
    id,
    text: noteText,
    createdAt: '2021-05-01',
    updatedAt: '2021-05-02',
  });
}

export function mockEditNoteApi(noteText = '', id = 1): jest.Mock<Promise<NoteListItem>> {
  return asJestMock(api.editNote).mockResolvedValueOnce(createTestNote(id, noteText));
}

export function mockGetNotesApi(...noteTexts: string[]): jest.Mock<Promise<NoteListItem[]>> {
  return mockGetNotesApiStartingFromId(0, ...noteTexts);
}

export function mockGetNotesApiFailed(): jest.Mock<Promise<NoteListItem[]>> {
  return asJestMock(api.getNotes).mockRejectedValueOnce([]);
}

export function mockGetNotesApiStartingFromId(startId = 0, ...noteTexts: string[]): jest.Mock<Promise<NoteListItem[]>> {
  return asJestMock(api.getNotes).mockResolvedValueOnce(noteTexts.map((text, i) => createTestNote(startId + i, text)));
}

export function mockDeleteNoteApi(): jest.Mock<Promise<void>> {
  return asJestMock(api.deleteNote).mockResolvedValue();
}

export function mockSearchApi(...noteTexts: string[]): jest.Mock<Promise<NoteListItem[]>> {
  return asJestMock(api.searchNotes).mockResolvedValue(
    noteTexts.map((text, i) => ({
      id: i,
      text,
      createdAt: '2021-05-11',
      updatedAt: '2021-05-11',
    })),
  );
}

export function fillNoteText(result: RenderResult, text: string): void {
  fireEvent.change(result.getByPlaceholderText('Enter note text'), {
    target: { value: text },
  });
}

export function fillSearchTerm(result: RenderResult, searchTerm: string): void {
  fireEvent.change(result.getByPlaceholderText('Search notes'), {
    target: { value: searchTerm },
  });
}

export function clickSubmitNote(result: RenderResult): void {
  fireEvent.click(result.getByRole('submit'));
}

export function clickAddNote(result: RenderResult): void {
  fireEvent.click(result.getByRole('add'));
}

export function clickLoadMoreNotes(result: RenderResult): void {
  fireEvent.click(result.getByTitle('Load more notes'));
}

export function clickDeleteNote(result: RenderResult): void {
  fireEvent.click(result.getByRole('deletion'));
}

export function clickDeleteNoteById(result: RenderResult, id: number): void {
  const deleteNoteElements = result.getAllByRole('deletion');
  fireEvent.click(deleteNoteElements[id]);
}

export function clickCancelNoteInput({ getByText }: RenderResult): void {
  fireEvent.click(getByText('Cancel'));
}

export function clickSearchClear(result: RenderResult): void {
  fireEvent.click(result.getByTitle('Clear'));
}
