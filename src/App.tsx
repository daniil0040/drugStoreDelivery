import { Route, Routes } from 'react-router-dom';
import { ReactNode } from 'react';
import { CartPage, HomePage, StoresPage } from '@/pages';
import { HOME_ROUTE, SHOPPING_CART, STORES_ROUTE } from '@/constants';
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
    path: SHOPPING_CART,
    element: <CartPage />,
  },
];

function App() {
  return (
    <Layout>
      <Routes>
        {appRoutes.map(route => {
          return <Route path={route.path} element={route.element} key={route.path} />;
        })}
        <Route path="*" element={<div>ErroePage</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
