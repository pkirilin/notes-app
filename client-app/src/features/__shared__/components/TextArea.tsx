import styled from 'styled-components';

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = styled.textarea`
  padding: ${props => props.theme.sizing.md};
  background-color: transparent;
  color: inherit;
  border: ${props =>
    `${props.theme.borders.default} solid ${props.theme.colors.backgroundActionDark}`};
  border-radius: ${props => props.theme.sizing.sm};
  outline: none;
  transition: ${props => props.theme.transition.default};

  &:focus {
    box-shadow: ${props =>
      `0 0 ${props.theme.sizing.md} ${props.theme.colors.backgroundActionDark}`};
  }

  &:disabled {
    color: ${props => props.theme.text.default};
    border: ${props =>
      `${props.theme.borders.default} solid ${props.theme.colors.backgroundAction}`};
  }

  &::placeholder {
    color: ${props => props.theme.text.hint};
  }
`;
