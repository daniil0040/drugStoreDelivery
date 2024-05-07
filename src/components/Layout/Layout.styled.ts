import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440;
  margin: 0 auto;
  padding: 10px 15px;
`;

export const StyledNavLink = styled(NavLink)`
  &.active {
    color: orange;
  }
`;

export const StyledHeader = styled.header`
  display: flex;
  gap: 5px;
  padding-bottom: 8px;
  border-bottom: 2px solid gray;
  justify-content: space-between;
  margin-bottom: 20px;
`;
