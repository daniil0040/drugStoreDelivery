import { Store } from '@/types';
import { StoresListItem } from '../StoresListItem/StoresListItem';

type Props = {
  stores: Store[];
};

export const StoresList = ({ stores }: Props) => {
  return (
    <ul>
      {stores.map(store => {
        return <StoresListItem store={store} key={store.id} />;
      })}
    </ul>
  );
};
