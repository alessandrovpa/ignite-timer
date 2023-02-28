import styled from 'styled-components';

export const HomeContainer = styled.main`
  margin: 0 auto;
  padding: 1rem 0;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
  }
`;

const BaseCountdownButton = styled.button`
  border: 0;
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  color: ${props => props.theme.white};
  font-size: 1.5rem;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${props => props.theme['green-300']};

  &:not(:disabled):hover{
    transition: 0.1s;
    background-color: ${props => props.theme['green-500']};
    cursor: pointer;
  }
`;

export const StpopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${props => props.theme['red-500']};

  &:not(:disabled):hover{
    transition: 0.1s;
    background-color: ${props => props.theme['red-700']};
    cursor: pointer;
  }
`;
