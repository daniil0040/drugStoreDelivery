import { MedicinesList } from '@/components/MedicinesList/MedicinesList';
import { StoresList } from '@/components/StoresList/StoresList';
import { Route, Routes } from 'react-router-dom';
import { StyledStoresPage } from './StoresPage.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import {
  selectStores,
  selectStoresIsError,
  selectStoresIsLoading,
} from '@/redux/stores/storesSlice.selectors';
import { apiGetStores } from '@/redux/stores/storesOperations';

const StoresPage = () => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector(selectStores);
  const isLoading = useAppSelector(selectStoresIsLoading);
  const isError = useAppSelector(selectStoresIsError);

  useEffect(() => {
    dispatch(apiGetStores());
  }, []);

  return (
    <StyledStoresPage>
      <StoresList stores={stores} />
      <Routes>
        <Route path=":companyName" element={<MedicinesList />} />
      </Routes>
    </StyledStoresPage>
  );
};
export default StoresPage;
