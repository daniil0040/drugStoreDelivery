import styled from 'styled-components';

export const StyledModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const StyledModalBackground = styled.div`
  position: relative;
  height: 400px;
  width: 300px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
`;

export const StyledCloseModalBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 18px;
  height: 18px;
  border: none;
  background: none;
  cursor: pointer;
  color: gray;

  &:hover,
  &:active {
    color: black;
  }
`;
