import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  ValidationSummary,
  ValidationSummaryDetail,
} from 'app/components';
import { loginRequest } from '../actions';
import { useInput } from 'app/hooks';
import { loginValidator, passwordValidator } from '../validators';

const LoginInput: React.FC = () => {
  const loginInput = useInput<string>('', loginValidator);
  const passwordInput = useInput<string>('', passwordValidator);
  const [isValidationSummaryVisible, setIsValidationSummaryVisible] = useState(
    false,
  );
  const dispatch = useDispatch();

  const validationSummaryDetails = useMemo<ValidationSummaryDetail[]>(
    () =>
      [loginInput, passwordInput].map(input => ({
        isValid: input.isValid,
        validationMessage: input.validationMessage,
      })),
    [loginInput, passwordInput],
  );

  const handleLogin = () => {
    const isInputCorrect = [loginInput, passwordInput].every(
      input => input.isValid,
    );

    if (isInputCorrect) {
      dispatch(
        loginRequest({
          userName: loginInput.value,
          password: passwordInput.value,
        }),
      );
    } else {
      setIsValidationSummaryVisible(!isInputCorrect);
    }
  };

  return (
    <div>
      <ValidationSummary
        isVisible={isValidationSummaryVisible}
        details={validationSummaryDetails}
      ></ValidationSummary>
      <Input type="text" placeholder="Login" {...loginInput.binding}></Input>
      <Input
        type="password"
        placeholder="Password"
        {...passwordInput.binding}
      ></Input>
      <Button onClick={handleLogin}>Sign in</Button>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginInput;
