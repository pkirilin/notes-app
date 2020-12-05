import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input } from 'app/components';
import { loginRequest } from '../actions';
import { useInput } from 'app/hooks';

const LoginInput: React.FC = () => {
  const login = useInput<string>('');
  const password = useInput<string>('');
  const dispatch = useDispatch();

  return (
    <div>
      <Input type="text" placeholder="Login" {...login.binding}></Input>
      <Input
        type="password"
        placeholder="Password"
        {...password.binding}
      ></Input>
      <Button
        onClick={() => {
          dispatch(
            loginRequest({
              userName: login.value,
              password: password.value,
            }),
          );
        }}
      >
        Sign in
      </Button>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginInput;
