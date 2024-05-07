import styled from 'styled-components';

export const StyledMapContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  padding-bottom: 20px;
`;

export const StyledTripInfoContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px black solid;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  transform: translate(0, 0);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &.hiden {
    /* display: none; */
    transform: translate(-110%, 0);
  }
`;
