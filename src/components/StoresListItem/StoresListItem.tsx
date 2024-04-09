import { Store } from '@/types';
import { NavLink } from 'react-router-dom';

type Props = {
  store: Store;
};

export const StoresListItem = ({ store: { companyName } }: Props) => {
  return (
    <li>
      <NavLink to={`/stores/${companyName}`}>{companyName}</NavLink>
    </li>
  );
};
