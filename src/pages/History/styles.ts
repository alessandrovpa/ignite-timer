import styled from 'styled-components';

export const HistoryContainer = styled.main`
  padding: 3.5rem;
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th{
      background: ${props => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;

      &:first-child{
        border-top-left-radius: 8px;
      }
      &:last-child{
        border-top-right-radius: 8px;
      }
    }

    td{
      background: ${props => props.theme['gray-700']};
      padding: 1rem;
      text-align: left;
      border-top: 4px solid ${props => props.theme['gray-800']};
    
      &:first-child{
        width: 50%;
      }
    }
  }
`;

interface StatusProps{
  statusColor: 'yellow' | 'red' | 'green';
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before{
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${props => props.theme[`${props.statusColor}-500`]};
  }
`;
