import styled from 'styled-components';

export const StyledGalleryWrapper = styled.div`
  width: 411px;
  min-height: 306px;
  .image-gallery-svg {
    height: 60px;
    width: 30px;
  }
  .image-gallery-image {
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 12px;
  }
  .image-gallery-thumbnail {
    margin-bottom: 10px;
    border-radius: 12px;
  }
  .image-gallery-thumbnail-image {
    height: 86px;
    border-radius: 8px;
  }
  .image-gallery-slides {
    border-radius: 12px;
  }
`;

export const StyledMainInfoContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  .contentInfo {
    display: flex;
    flex-direction: column;
    .contentInfoName {
      margin-bottom: 25px;
    }
    .contentInfoPrice {
      margin-bottom: 48px;
      font-weight: 400;
      font-size: 24px;
    }
    .contentInfoButton {
      border-radius: 8px;
      padding: 10px;
      border: 1px solid transparent;
      background-color: #b8b8b8;
      font-size: 18px;
      color: #767676;
      cursor: pointer;
      &:hover {
        border: 1px solid #777777;
      }
    }
  }
`;

export const StyledFeaturesContainer = styled.div`
  .listItemName {
    font-size: 18px;
    color: #626262;
    flex-basis: 40%;
    flex-grow: 1;
  }
  .listItemValue {
    font-size: 18px;
    color: #151515;
    flex-basis: 60%;
    flex-grow: 1;
  }
  .featuresTitle {
    font-size: 24px;
    margin-bottom: 24px;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .listItem {
    display: flex;
  }
`;
