import styled from 'styled-components';

export const StyledFilterBlock = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  .checkbox {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    margin: -1px;
    &:checked + .fake {
      .checkmark {
        opacity: 1;
      }
    }
  }
  .fake {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border: 1px solid #767676;
    border-radius: 1px;
    color: #767676;
    transition: all 0.3s;
    margin-right: 8px;
  }
  .checkmark {
    width: 16px;
    height: 16px;
    opacity: 0;
    transition: all 0.3s;
  }
  .labelsContainer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid #bbb8b8;
    border-radius: 12px;
    padding: 10px;
  }
  .filtersBlockTitle {
    margin-bottom: 12px;
    font-size: 14px;
  }
`;
