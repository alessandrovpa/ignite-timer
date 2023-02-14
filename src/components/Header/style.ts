import styled from 'styled-components';

export const HeaderContainer = styled.header`
  padding: 2rem;
  border-bottom: 2px solid ${props => props.theme['gray-900']};

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav{
    display: flex;
    gap: 0.5rem;

    a{
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${props => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover{
        color: ${props => props.theme['green-300']};
        border-bottom: 3px solid ${props => props.theme['green-500']};
      }

      &.active{
        color: ${props => props.theme['green-500']};
      }
    }
  }
`;
