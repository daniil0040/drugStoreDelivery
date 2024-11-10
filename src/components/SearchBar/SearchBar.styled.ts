import styled from 'styled-components';

export const StyledSearchBarContainer = styled.form`
  position: relative;
  color: #767676;
  margin-bottom: 16px;

  .searchBar {
    width: 100%;
    border: 1px solid #bbb8b8;
    border-radius: 12px;
    padding: 15px 0 15px 44px;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
  }
  .magnifyingGlassIcon {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 10px;
    left: 12px;
  }
`;
