import { waitFor } from '@testing-library/dom';

export function asJestMock<TResult>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: (...args: any[]) => TResult,
): jest.Mock<TResult> {
  return func as jest.Mock<TResult>;
}

export function waitForMultipleCalls(fn: jest.Mock, calls: number): Promise<void> {
  return waitFor(() => expect(fn).toHaveBeenCalledTimes(calls));
}

export function waitForSingleCall(fn: jest.Mock): Promise<void> {
  return waitForMultipleCalls(fn, 1);
}
