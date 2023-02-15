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

export const FormContainer = styled.div`
  color: ${props => props.theme['gray-100']};
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const BaseInput = styled.input`
  color: ${props => props.theme['gray-100']};
  padding: 0.25rem;
  background: transparent;
  border: 0;
  font-size: 1.25rem;
  border-bottom: 2px solid ${props => props.theme['gray-600']};

  &:focus{
    box-shadow: none;
    border-bottom: 2px solid ${props => props.theme['green-500']};;
  }
`;

export const TaskInput = styled(BaseInput)`
  &::-webkit-calendar-picker-indicator{
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;

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

export const StartCountdownButton = styled.button`
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

  background-color: ${props => props.theme['green-300']};

  &:not(:disabled):hover{
    transition: 0.1s;
    background-color: ${props => props.theme['green-500']};
    cursor: pointer;
  }

  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
