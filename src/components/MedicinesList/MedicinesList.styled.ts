import styled from 'styled-components';

export const SyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 30px 60px;
`;
