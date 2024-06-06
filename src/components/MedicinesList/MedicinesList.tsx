import { Medicine } from '@/types';
import { MedicineListItem } from '../MedicinesListItem/MedicinesListItem';
import { useParams } from 'react-router-dom';
import { SyledList } from './MedicinesList.styled';
import { useAppDispatch } from '@/app/hooks';
import { addToCart } from '@/redux/cart/cartSlice';

type Props = {
  medicines: Medicine[];
};

type Params = {
  companyName: string;
};

export const MedecinesList = ({ medicines }: Props) => {
  const { companyName } = useParams<Params>();
  const dispatch = useAppDispatch();
  const handleAddToCart = (medicine: Medicine): void => {
    dispatch(addToCart(medicine));
  };

  if (companyName === undefined)
    return (
      <SyledList>
        {medicines.map(medicine => {
          return (
            <MedicineListItem
              medicine={medicine}
              key={medicine.id}
              handleAddToCart={handleAddToCart}
            />
          );
        })}
      </SyledList>
    );

  const visibleMedicines = medicines.filter(medicine => {
    return medicine.pharmacy === companyName;
  });
  return (
    <SyledList>
      {visibleMedicines.map(medicine => {
        return (
          <MedicineListItem
            medicine={medicine}
            key={medicine.id}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </SyledList>
  );
};
