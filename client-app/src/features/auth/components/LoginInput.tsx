import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  FlexContainer,
  Input,
  Page,
  Typography,
  ValidationSummary,
  ValidationSummaryDetail,
} from '../../__shared__/components';
import { loginRequest } from '../actions';
import { useLogin, usePassword } from '../hooks';

const LoginInput: React.FC = () => {
  const [login, loginError, loginValidationMessage, setLogin] = useLogin('');
  const [
    password,
    passwordError,
    passwordValidationMessage,
    setPassword,
  ] = usePassword('');

  const [rememberMe, setRememberMe] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const [validationSummaryVisible, setValidationSummaryVisible] = useState(
    false,
  );

  const validationSummaryDetails = useMemo<ValidationSummaryDetail[]>(
    () =>
      [
        {
          error: loginError,
          validationMessage: loginValidationMessage,
        },
        {
          error: passwordError,
          validationMessage: passwordValidationMessage,
        },
      ].map(({ error, validationMessage }) => ({
        isValid: !error,
        validationMessage,
      })),
    [
      loginError,
      loginValidationMessage,
      passwordError,
      passwordValidationMessage,
    ],
  );

  const dispatch = useDispatch();

  const inputError = loginError || passwordError;

  useEffect(() => {
    if (submitClicked) {
      setValidationSummaryVisible(inputError);
    }
  }, [submitClicked, inputError]);

  const handleLogin = () => {
    setSubmitClicked(true);
    if (!inputError) {
      dispatch(
        loginRequest({
          userName: login,
          password,
          rememberMe,
        }),
      );
    }
  };

  return (
    <Page flex={1}>
      <FlexContainer
        direction="column"
        spacing="lg"
        flexBreakpoints={{ xs: 1, sm: 0.5, md: 0.3, xl: 0.2 }}
      >
        <ValidationSummary
          isVisible={validationSummaryVisible}
          details={validationSummaryDetails}
        ></ValidationSummary>
        <Input
          type="text"
          placeholder="Login"
          value={login}
          onChange={event => setLogin(event.target.value)}
        ></Input>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        ></Input>
        <FlexContainer
          spacing="lg"
          justify="space-between"
          alignBreakpoints={{ xs: 'center', sm: 'flex-start' }}
          direction="row"
        >
          <FlexContainer as="label" spacing="sm" align="center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(rememberMe => !rememberMe)}
            ></input>
            <span>Remember me</span>
          </FlexContainer>
          <Typography type="body2">
            <Link to="/register">Register</Link>
          </Typography>
        </FlexContainer>
        <Button onClick={handleLogin}>Sign in</Button>
      </FlexContainer>
    </Page>
  );
};

export default LoginInput;
