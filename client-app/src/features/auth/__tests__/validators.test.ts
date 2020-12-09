import { loginValidator, passwordValidator } from '../validators';

describe('loginValidator', () => {
  test('should validate login input value', () => {
    // Arrange
    const login1 = '';
    const login2 = 'aa';
    const login3 = 'aaa';

    // Act
    const result1 = loginValidator(login1);
    const result2 = loginValidator(login2);
    const result3 = loginValidator(login3);

    // Assert
    expect(result1).toEqual({
      isValid: false,
      message: 'Login is required',
    });
    expect(result2).toEqual({
      isValid: false,
      message: 'Login is too short',
    });
    expect(result3).toEqual({
      isValid: true,
    });
  });
});

describe('password validator', () => {
  test('should validate password value', () => {
    // Arrange
    const password1 = '';
    const password2 = 'a';
    const password3 = 'test';

    // Act
    const result1 = passwordValidator(password1);
    const result2 = passwordValidator(password2);
    const result3 = passwordValidator(password3);

    // Assert
    expect(result1).toEqual({
      isValid: false,
      message: 'Password is required',
    });
    expect(result2).toEqual({
      isValid: true,
    });
    expect(result3).toEqual({
      isValid: true,
    });
  });
});
