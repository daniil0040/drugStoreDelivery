import { StyledCatalogPageContainer } from './CatalogPage.styled';
// import { FilterCheckBlock } from '@/components/FilterCheckBlock/FilterCheckBlock';
import { useAppSelector } from '@/app/hooks';
import { selectMedicines } from '@/redux/stores/storesSlice.selectors';
// import { SearchBar } from '@/components/SearchBar/SearchBar';
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
        {/* <SearchBar /> */}
        {/* <FilterCheckBlock title={'Form of issue'} data={uniqueOptions} /> */}
      </div>
      <div className="list"></div>
    </StyledCatalogPageContainer>
  );
};
