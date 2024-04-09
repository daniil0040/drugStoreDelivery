import { Medicine } from '@/types';
import { MedicineListItem } from '../MedicinesListItem/MedicinesListItem';
import { useParams } from 'react-router-dom';
import { SyledList } from './MedicinesList.styled';

type Props = {
  medicines: Medicine[];
};

type Params = {
  companyName: string;
};

export const MedecinesList = ({ medicines }: Props) => {
  const { companyName } = useParams<Params>();

  if (companyName === undefined)
    return (
      <SyledList>
        {medicines.map(medicine => {
          return <MedicineListItem medicine={medicine} key={medicine.id} />;
        })}
      </SyledList>
    );

  const visibleMedicines = medicines.filter(medicine => {
    return medicine.pharmacy === companyName;
  });
  return (
    <SyledList>
      {visibleMedicines.map(medicine => {
        return <MedicineListItem medicine={medicine} key={medicine.id} />;
      })}
    </SyledList>
  );
};
