import { useAppDispatch, useAppSelector } from '@/app/hooks';
// import DashboardOrderItem from '@/components/DashboardOrderItem/DashboardOrderItem';
import { selectUserData } from '@/redux/auth/authSelectors';
import { getUserOrders } from '@/redux/orders/orderSlice.operations';
import { selectUserOrders } from '@/redux/orders/ordersSlice.selectors';
import { TOrder } from '@/types';
import { useEffect } from 'react';

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectUserOrders);
  const user = useAppSelector(selectUserData);

  useEffect(() => {
    if (user) {
      dispatch(getUserOrders(user?.uid));
    }
  }, [user]);

  // console.log(orders);

  if (orders.length === 0) return null;

  return (
    <ul>
      {orders.map((order: TOrder) => {
        return (
          <li key={order.uid}>{/* <DashboardOrderItem order={order} /> */}</li>
        );
      })}
    </ul>
  );
};

export default Dashboard;
