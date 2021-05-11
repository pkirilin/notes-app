import styled from 'styled-components';
import { FlexContainer } from './FlexContainer';

export const Page = styled(FlexContainer)`
  padding: ${props => props.theme.sizing.lg};
`;
