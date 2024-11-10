import { StyledCatalogPageContainer } from './CatalogPage.styled';
import { FilterCheckBlock, SearchBar } from '@/components';
import { useAppSelector } from '@/app/hooks';
import { selectMedicines } from '@/redux/stores/storesSlice.selectors';

type Props = {};

export const CatalogPage = (props: Props) => {
  const medicines = useAppSelector(selectMedicines);
  const filterData = medicines.flatMap(item => item.medicineTypes);
  // console.log([...new Set(filterData)]);
  const uniqueOptions = filterData.filter(
    (item, i) => filterData.indexOf(item) === i,
  );

  return (
    <StyledCatalogPageContainer>
      <div className="sideBar">
        <SearchBar />
        <FilterCheckBlock title={'Form of issue'} data={uniqueOptions} />
      </div>
    </StyledCatalogPageContainer>
  );
};
