export function asJestMock<TResult>(
  func: (...args: unknown[]) => TResult,
): jest.Mock<TResult> {
  return func as jest.Mock<TResult>;
}
