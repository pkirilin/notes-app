import styled from 'styled-components';

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = styled.textarea`
  padding: ${props => props.theme.sizing.md};
`;
