import { Medicine } from '@/types';
import { MedicineListItem } from '../MedicinesListItem/MedicinesListItem';
import { useParams } from 'react-router-dom';
import { SyledList } from './MedicinesList.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart } from '@/redux/cart/cartSlice';
import { selectMedicines } from '@/redux/stores/storesSlice.selectors';
import { useEffect } from 'react';
import { apiGetMedicinesByPharmacy } from '@/redux/stores/storesOperations';

type Params = {
  companyName: string;
};

export const MedicinesList = () => {
  const { companyName } = useParams<Params>();
  const dispatch = useAppDispatch();
  const medicines = useAppSelector(selectMedicines);
  useEffect(() => {
    if (companyName) {
      dispatch(apiGetMedicinesByPharmacy(companyName));
    }
  }, [companyName]);

  const handleAddToCart = (medicine: Medicine): void => {
    dispatch(addToCart(medicine));
  };

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
};
