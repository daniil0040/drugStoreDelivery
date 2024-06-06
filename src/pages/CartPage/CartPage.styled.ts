import styled from 'styled-components';

export const StyledFormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: rgb(220, 220, 220, 0.7);
  border: 0.5px solid black;
  border-radius: 10px;
`;

export const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 15px;
`;

export const StyledSingleInputContainer = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  width: calc((100% - 20px * 1) / 2);
`;

export const StyledInput = styled.input`
  height: 35px;
`;

export const StyledForm = styled.form`
  display: grid;
  grid-template-areas:
    'form list list list'
    'form list list list'
    'total total total total';
  .formContainer {
    grid-area: form;
    max-width: 650px;
    max-height: 550px;
  }
  .listContainer {
    min-width: 432px;
    grid-area: list;
    max-height: 550px;
    overflow-y: scroll;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px 15px;
  }
  .totalContainer {
    margin-top: 10px;
    grid-area: total;
    position: relative;
    display: flex;
  }
  @media (max-width: 768px) {
    grid-template-areas:
      '. total'
      'form form'
      'list list  ';
  }
`;

export const StyledSubmitContainer = styled.div`
  /* margin-left: auto; */
  margin: 0 auto;
`;

export const StyledCartList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledCaptchaErr = styled.p`
  color: red;
  position: absolute;
  left: 13px;
  top: 6px;
  font-size: 11px;
`;

// export const StyledList = styled.ul`
//   gap: 10px;
// `;

export const StyledListItem = styled.li`
  padding: 12px 8px;
  border: 1px solid black;
  border-radius: 8px;
  position: relative;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledListItemCloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 5px;
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
`;

export const StyledListItemQuantity = styled.span`
  display: inline-block;
  padding: 8px 8px;
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export const StyledListItemQuantityWrapper = styled.div`
  position: relative;
  width: 100px;
`;

export const StyledListItemQuantityBtn = styled.button`
  position: absolute;
  background-color: transparent;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  &.up {
    right: 5px;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
  }
  &.down {
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
