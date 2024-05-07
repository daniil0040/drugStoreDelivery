import { HOME_ROUTE, SHOPPING_CART, STORES_ROUTE } from '@/constants/routes';
import { ReactNode } from 'react';
// import { NavLink } from 'react-router-dom';
import { LayoutContainer, StyledHeader, StyledNavLink } from './Layout.styled';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <StyledHeader>
        <StyledNavLink to={HOME_ROUTE}>Home</StyledNavLink>
        <StyledNavLink to={STORES_ROUTE}>Stores</StyledNavLink>
        <StyledNavLink to={SHOPPING_CART}>Cart</StyledNavLink>
      </StyledHeader>
      <main>{children}</main>
      <footer>Footer</footer>
    </LayoutContainer>
  );
};
