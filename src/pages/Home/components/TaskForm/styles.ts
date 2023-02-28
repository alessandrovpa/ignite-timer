import styled from 'styled-components';

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
    border-bottom: 2px solid ${props => props.theme['green-500']};
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
