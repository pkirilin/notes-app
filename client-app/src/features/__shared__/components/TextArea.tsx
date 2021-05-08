import styled from 'styled-components';
import { inputBaseStyles } from './Input';

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = styled.textarea`
  ${inputBaseStyles};
`;
