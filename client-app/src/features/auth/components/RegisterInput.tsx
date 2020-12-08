import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'app/components';
import { useInput } from 'app/hooks';
import { registerRequest } from '../actions';

const RegisterInput: React.FC = () => {
  const loginInput = useInput<string>('');
  const passwordInput = useInput<string>('');
  const passwordConfirmInput = useInput<string>('');
  const dispatch = useDispatch();

  return (
    <div>
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
      <Button
        onClick={() => {
          dispatch(
            registerRequest({
              userName: loginInput.value,
              password: passwordInput.value,
            }),
          );
        }}
      >
        Register
      </Button>
      <Link to="/login">Sign in</Link>
    </div>
  );
};

export default RegisterInput;
