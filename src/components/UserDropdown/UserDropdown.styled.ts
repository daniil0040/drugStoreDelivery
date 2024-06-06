import styled from 'styled-components';

export const StyledDropdownContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  padding-top: 20px;
  min-height: 110px;
  transform: scaleY(0);
  transform-origin: top;
  transition:
    transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 200ms;
  opacity: 0;
  z-index: 1;
  &.open {
    transform: scaleY(1);
    opacity: 1;
  }
`;

export const StyledDropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #dcdcdc;
  border: 1px solid black;
  border-radius: 5px;
  padding: 15px 10px;
`;
