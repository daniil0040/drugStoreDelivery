import { useAppSelector } from '@/app/hooks';
import { STORES_ROUTE } from '@/constants';
import { selectAuthenticated } from '@/redux/auth/authSelectors';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
  redirectTo?: string;
};

export const RestrictedRoute = ({
  children,
  redirectTo = STORES_ROUTE,
}: Props) => {
  const isAuthenticated = useAppSelector(selectAuthenticated);
  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};
