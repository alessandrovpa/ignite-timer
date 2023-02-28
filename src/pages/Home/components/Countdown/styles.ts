import styled from 'styled-components';

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  color: ${props => props.theme.white};

  display: flex;
  gap: 1rem;

  span{
    background: ${props => props.theme['gray-700']};
    border-radius: 10px;
    padding: 2rem 1rem;
  }
`;

export const Separator = styled.div`
  color: ${props => props.theme['green-500']};
  border-radius: 10px;
  padding: 1.5rem 0;
`;
