import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ValidationSummaryDetail,
  ValidationSummary,
  Input,
  CheckBox,
  Button,
} from '../../../app/components';
import { useInput, useCheckbox } from '../../../app/hooks';
import { loginRequest } from '../actions';
import { loginValidator, passwordValidator } from '../validators';

const LoginInput: React.FC = () => {
  const loginInput = useInput<string>('', loginValidator);
  const passwordInput = useInput<string>('', passwordValidator);
  const rememberMeCheckbox = useCheckbox(true);
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
          rememberMe: rememberMeCheckbox.value,
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
      <CheckBox label="Remember me" {...rememberMeCheckbox.binding}></CheckBox>
      <Button onClick={handleLogin}>Sign in</Button>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginInput;
