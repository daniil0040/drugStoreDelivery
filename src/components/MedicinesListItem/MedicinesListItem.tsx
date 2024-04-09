import { Medicine } from '@/types';

type Props = {
  medicine: Medicine;
};

export const MedicineListItem = ({ medicine: { id, medicineTitle, pharmacy, price } }: Props) => {
  return (
    <li>
      <h3>{medicineTitle}</h3>
      <p>{pharmacy}</p>
      <p>{price}</p>
      <button type="button">Add to cart</button>
    </li>
  );
};
