import { useAppSelector } from '@/app/hooks';
import { LOGIN_ROUTE } from '@/constants';
import { selectAuthenticated } from '@/redux/auth/authSelectors';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
  redirectTo?: string;
};

export const PrivateRoute = ({ children, redirectTo = LOGIN_ROUTE }: Props) => {
  const isAuthenticated = useAppSelector(selectAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};
