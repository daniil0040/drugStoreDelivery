import styled from 'styled-components';

export const StyledFormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;
export const StyledForm = styled.form`
  display: grid;
  grid-template-areas:
    'form list list list'
    'form list list list'
    'total . . .  ';
  .formContainer {
    grid-area: form;
  }
  .listContainer {
    grid-area: list;
  }
  .totalContainer {
    grid-area: total;
  }
  @media (max-width: 768px) {
    grid-template-areas:
      '. total'
      'form form'
      'list list  ';
  }
`;
