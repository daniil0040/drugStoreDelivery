import stores from '../../../data/stores.json';
import medicines from '../../../data/medicines.json';
import { MedecinesList } from '@/components/MedicinesList/MedicinesList';
import { StoresList } from '@/components/StoresList/StoresList';
import { Route, Routes } from 'react-router-dom';
import { StyledStoresPage } from './StoresPage.styled';

const StoresPage = () => {
  return (
    <StyledStoresPage>
      <StoresList stores={stores} />
      <Routes>
        <Route path=":companyName" element={<MedecinesList medicines={medicines} />} />
      </Routes>
    </StyledStoresPage>
  );
};
export default StoresPage;
