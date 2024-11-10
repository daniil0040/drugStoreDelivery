import { ReactNode, useEffect, useState } from 'react';
import { LayoutContainer } from './Layout.styled';
import { Header } from '@/components';
// import { selectIsModalOpen } from '@/redux/modalWindow/modalWindow.selectors';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <main>{children}</main>
      <footer>Footer</footer>
      {/* {isModalOpen && (
        <ModalWindow>
          <form action="">
            <label>
              Input
              <input type="text" />
            </label>
          </form>
        </ModalWindow>
      )} */}
    </LayoutContainer>
  );
};
