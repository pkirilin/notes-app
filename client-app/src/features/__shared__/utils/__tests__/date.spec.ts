import { formatNoteUpdateDate } from '../date';

const testCases = [
  {
    input: '2021-05-03T13:35:17',
    result: '3 May 2021, 13:35',
  },
  {
    input: '2021-05-16T00:04:12',
    result: '16 May 2021, 00:04',
  },
];

describe('formatNoteUpdateDate', () => {
  describe('when correct date passed', () => {
    testCases.forEach(({ input, result }) => {
      test(`should return '${result}' for '${input}'`, () => {
        const date = new Date(input);

        expect(formatNoteUpdateDate(date)).toBe(result);
      });
    });
  });
});
