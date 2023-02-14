import styled from 'styled-components';

export const LayoutContainer = styled.div`
  max-width: 74rem;
  background-color: red;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  background: ${props => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`;
