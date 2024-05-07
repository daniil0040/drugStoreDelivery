import { Medicine } from '@/types';
import { StyledListCard } from './MedicinesListItem.styled';

type Props = {
  medicine: Medicine;
  handleAddToCart: (medecine: Medicine) => void;
};

export const MedicineListItem = ({
  medicine: { id, medicineTitle, pharmacy, price },
  handleAddToCart,
}: Props) => {
  return (
    <StyledListCard>
      <h3>{medicineTitle}</h3>
      <p>{pharmacy}</p>
      <p>{price}</p>
      <button type="button" onClick={() => handleAddToCart({ id, medicineTitle, pharmacy, price })}>
        Add to cart
      </button>
    </StyledListCard>
  );
};
