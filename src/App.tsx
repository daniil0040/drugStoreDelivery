import { Route, Routes } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { CartPage, HomePage, LoginPage, SignupPage, StoresPage } from '@/pages';
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SHOPPING_CART_ROUTE,
  SIGNUP_ROUTE,
  STORES_ROUTE,
} from '@/constants';
import { Layout, PrivateRoute, RestrictedRoute } from '@/components';
import DashboarPage from './pages/DashboardPage/DashboarPage';
import toast, { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './app/firebase';
import { TUser } from './types/UserType';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuth, setRefreshing } from './redux/auth/authSlice';
import { doc, getDoc } from 'firebase/firestore';
import { selectIsRefreshing } from './redux/auth/authSelectors';
import { TailSpin } from 'react-loader-spinner';
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
    element: (
      <RestrictedRoute>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    path: SIGNUP_ROUTE,
    element: (
      <RestrictedRoute>
        <SignupPage />
      </RestrictedRoute>
    ),
  },
  {
    path: DASHBOARD_ROUTE,
    element: (
      <PrivateRoute>
        <DashboarPage />
      </PrivateRoute>
    ),
  },
];

function App() {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);
  console.log('isRefreshing');
  useEffect(() => {
    const listener = onAuthStateChanged(auth, async user => {
      if (user) {
        console.log(user);
        const docRef = doc(db, 'users', user.uid);
        const serializedUserData = (await getDoc(docRef)).data() as TUser;
        dispatch(setAuth(serializedUserData));
        toast.success(`Hello, ${serializedUserData.displayName}`);
      }
      dispatch(setRefreshing(false));
    });

    return listener;
  }, []);
  if (isRefreshing) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
    );
  }
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
