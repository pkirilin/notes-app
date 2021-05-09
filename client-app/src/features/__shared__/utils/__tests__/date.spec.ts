import { formatNoteUpdateDate } from '../date';

describe('formatNoteUpdateDate', () => {
  describe('when correct date passed', () => {
    test('should return formatted date string', () => {
      const date = new Date('2021-05-03T13:35:17');

      expect(formatNoteUpdateDate(date)).toBe('3 May 2021, 13:35');
    });
  });
});
