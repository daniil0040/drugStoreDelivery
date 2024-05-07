import { Route, Routes } from 'react-router-dom';
import { ReactNode } from 'react';
import { CartPage, HomePage, StoresPage } from '@/pages';
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SETTINGS_ROUTE,
  SHOPPING_CART_ROUTE,
  SIGNUP_ROUTE,
  STORES_ROUTE,
} from '@/constants';
import { Layout } from '@/components';

type TRoute = {
  path: string;
  element: ReactNode;
};

const appRoutes: TRoute[] = [
  {
    path: HOME_ROUTE,
    element: <HomePage />,
  },
  {
    path: `${STORES_ROUTE}/*`,
    element: <StoresPage />,
  },
  {
    path: SHOPPING_CART_ROUTE,
    element: <CartPage />,
  },
  {
    path: LOGIN_ROUTE,
    element: <CartPage />,
  },
  {
    path: SIGNUP_ROUTE,
    element: <CartPage />,
  },
  {
    path: SETTINGS_ROUTE,
    element: <CartPage />,
  },
  {
    path: DASHBOARD_ROUTE,
    element: <CartPage />,
  },
];

function App() {
  return (
    <Layout>
      <Routes>
        {appRoutes.map(route => {
          return (
            <Route path={route.path} element={route.element} key={route.path} />
          );
        })}
        <Route path="*" element={<div>ErroePage</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
