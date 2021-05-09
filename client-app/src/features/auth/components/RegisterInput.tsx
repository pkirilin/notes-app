import React, { useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginValidator, passwordValidator } from '../validators';
import {
  ValidationSummaryDetail,
  Alert,
  ValidationSummary,
} from '../../../app/components';
import { useInput } from '../../../app/hooks';
import { useTypedSelector } from '../../__shared__/hooks';
import { registerRequest } from '../actions';
import {
  Button,
  FlexContainer,
  Input,
  Typography,
} from '../../__shared__/components';

const RegisterInput: React.FC = () => {
  const loginInput = useInput<string>('', loginValidator);
  const passwordInput = useInput<string>('', passwordValidator);
  const passwordConfirmInput = useInput<string>('');
  const [isValidationSummaryVisible, setIsValidationSummaryVisible] = useState(
    false,
  );
  const registrationStatus = useTypedSelector(
    state => state?.auth?.registrationResult?.status,
  );
  const registrationResultMessage = useTypedSelector(
    state => state?.auth?.registrationResult?.message,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSummaryDetails = useMemo<ValidationSummaryDetail[]>(
    () =>
      [loginInput, passwordInput, passwordConfirmInput].map(input => ({
        isValid: input.isValid,
        validationMessage: input.validationMessage,
      })),
    [loginInput, passwordInput, passwordConfirmInput],
  );

  useEffect(() => {
    if (registrationStatus === 'completed') {
      // Redirects user to login page after completing registration
      history.push('/login');
    }
  }, [registrationStatus]);

  useEffect(() => {
    const { value: password } = passwordInput;
    const {
      value: passwordConfirm,
      setIsValid,
      setValidationMessage,
    } = passwordConfirmInput;

    if (
      (password === '' && passwordConfirm === '') ||
      password === passwordConfirm
    ) {
      setIsValid(true);
      setValidationMessage('');
    } else {
      setIsValid(false);
      setValidationMessage('Passwords do not match');
    }
  }, [passwordInput, passwordConfirmInput]);

  const handleRegister = () => {
    const isInputCorrect = [
      loginInput,
      passwordInput,
      passwordConfirmInput,
    ].every(input => input.isValid);

    if (isInputCorrect) {
      dispatch(
        registerRequest({
          userName: loginInput.value,
          password: passwordInput.value,
        }),
      );
    } else {
      setIsValidationSummaryVisible(true);
    }
  };

  return (
    <FlexContainer grow={1}>
      <FlexContainer
        direction="column"
        spacing="lg"
        growBreakpoints={{ xs: 1, sm: 0.5, md: 0.3, xl: 0.2 }}
      >
        <Alert isVisible={registrationStatus === 'error'} type="error">
          {registrationResultMessage}
        </Alert>
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
        <Input
          type="password"
          placeholder="Confirm password"
          {...passwordConfirmInput.binding}
        ></Input>
        <Button onClick={handleRegister}>Register</Button>
        <Typography type="body2" align="center">
          <Link to="/login">Sign in</Link>
        </Typography>
      </FlexContainer>
    </FlexContainer>
  );
};

export default RegisterInput;
