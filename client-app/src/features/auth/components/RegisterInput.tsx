import React, { useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../__shared__/hooks';
import { registerRequest } from '../actions';
import {
  Button,
  FlexContainer,
  Input,
  Page,
  Typography,
  ValidationSummary,
  ValidationSummaryDetail,
} from '../../__shared__/components';
import { useLogin, usePassword } from '../hooks';

const RegisterInput: React.FC = () => {
  const [login, loginError, loginValidationMessage, setLogin] = useLogin('');
  const [password, passwordError, passwordValidationMessage, setPassword] = usePassword('');
  const [
    passwordConfirm,
    passwordConfirmError,
    passwordConfirmValidationMessage,
    setPasswordConfirm,
    setPasswordConfirmError,
    setPasswordConfirmValidationMessage,
  ] = usePassword('');

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
        {
          error: passwordConfirmError,
          validationMessage: passwordConfirmValidationMessage,
        },
      ].map(({ error, validationMessage }) => ({
        isValid: !error,
        validationMessage,
      })),
    [
      login,
      loginError,
      loginValidationMessage,
      password,
      passwordError,
      passwordValidationMessage,
      passwordConfirm,
      passwordConfirmError,
      passwordConfirmValidationMessage,
    ],
  );

  const [validationSummaryVisible, setValidationSummaryVisible] = useState(false);

  const registrationStatus = useTypedSelector(state => state?.auth?.registrationResult?.status);
  const registrationResultMessage = useTypedSelector(state => state?.auth?.registrationResult?.message);

  const [submitClicked, setSubmitClicked] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const inputError = loginError || passwordError || passwordConfirmError;

  useEffect(() => {
    if (registrationStatus === 'completed') {
      history.push('/login');
    }
  }, [registrationStatus]);

  useEffect(() => {
    if ((password === '' && passwordConfirm === '') || password === passwordConfirm) {
      setPasswordConfirmError(false);
      setPasswordConfirmValidationMessage('');
    } else {
      setPasswordConfirmError(true);
      setPasswordConfirmValidationMessage('Passwords do not match');
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    if (submitClicked) {
      setValidationSummaryVisible(inputError);
    }
  }, [submitClicked, inputError]);

  const handleRegister = () => {
    setSubmitClicked(true);
    if (!inputError) {
      dispatch(
        registerRequest({
          userName: login,
          password,
        }),
      );
    }
  };

  return (
    <Page flex={1}>
      <FlexContainer direction="column" spacing="lg" flexBreakpoints={{ xs: 1, sm: 0.5, md: 0.3, xl: 0.2 }}>
        {registrationStatus === 'error' && <Typography>{registrationResultMessage}</Typography>}
        <ValidationSummary isVisible={validationSummaryVisible} details={validationSummaryDetails}></ValidationSummary>
        <Input type="text" placeholder="Login" value={login} onChange={event => setLogin(event.target.value)}></Input>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        ></Input>
        <Input
          type="password"
          placeholder="Confirm password"
          value={passwordConfirm}
          onChange={event => setPasswordConfirm(event.target.value)}
        ></Input>
        <Button onClick={handleRegister}>Register</Button>
        <Typography type="body2" align="center">
          <Link to="/login">Sign in</Link>
        </Typography>
      </FlexContainer>
    </Page>
  );
};

export default RegisterInput;
