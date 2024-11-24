import { useAppSelector } from '@/app/hooks';
import { selectMedicines } from '@/redux/stores/storesSlice.selectors';

type Props = {};

export const CatalogList = (props: Props) => {
  const medecines = useAppSelector(selectMedicines);
  return (
    <div>
      <ul>
        {medecines.map(item => {
          return <li key={item.id}></li>;
        })}
      </ul>
    </div>
  );
};
