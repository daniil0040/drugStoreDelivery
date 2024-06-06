import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ArrowDownIcon from '@/assets/images/MaterialSymbolsKeyboardArrowDown.svg?react';

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
  width: 100%;
  align-items: center;
`;

export const StyledDropdownOpenBtn = styled.button`
  display: flex;
  cursor: pointer;
  background: none;
  border: none;
`;

export const StyledArrowDownIcon = styled(ArrowDownIcon)`
  transition: 150ms linear all;
  transform: translateY(0) rotate(0);
  &.active {
    transform: translateY(-10%) rotate(180deg);
  }
`;

export const StyledUserImg = styled.img`
  border-radius: 8px;
`;

export const StyledUserInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const StyledUserName = styled.p`
  font-size: 14px;
`;
