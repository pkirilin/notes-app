import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInput, useCheckbox } from '../../../app/hooks';
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
    <Page flex={1}>
      <FlexContainer
        direction="column"
        spacing="lg"
        flexBreakpoints={{ xs: 1, sm: 0.5, md: 0.3, xl: 0.2 }}
      >
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
        <FlexContainer
          spacing="lg"
          justify="space-between"
          alignBreakpoints={{ xs: 'center', sm: 'flex-start' }}
          direction="row"
        >
          <FlexContainer as="label" spacing="sm" align="center">
            <input
              type="checkbox"
              checked
              {...rememberMeCheckbox.binding}
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
