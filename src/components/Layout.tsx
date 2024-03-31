import { HOME_ROUTE, SHOPPING_CART, STORES_ROUTE } from '@/constants/routes';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <NavLink to={HOME_ROUTE}>Home</NavLink>
        <NavLink to={STORES_ROUTE}>Stores</NavLink>
        <NavLink to={SHOPPING_CART}>Cart</NavLink>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};
