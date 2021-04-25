import React from 'react';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../actions';
import styled from 'styled-components';
import { Button } from '../../../app/components';
import { useTypedSelector } from '../../../app/hooks';

const Paragraph = styled.p`
  font-size: 32px;
  font-weight: bold;
  font-style: italic;
  margin: 0 0 10px 0;
`;

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const count = useTypedSelector(state => state.counter);

  return (
    <React.Fragment>
      <Paragraph>{count}</Paragraph>
      <Button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement
      </Button>
      <Button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </Button>
    </React.Fragment>
  );
};

export default Counter;
