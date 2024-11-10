import { db } from '@/app/firebase';
import { TOrder } from '@/types';
import { CreateOrderValues } from '@/types/FormType';
import { CartMedicine } from '@/types/MedicineType';
import { TUser } from '@/types/UserType';
import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

export const getUserOrders = createAsyncThunk<
  TOrder[],
  string,
  { rejectValue: string }
>('orders/userOrder', async (id, { rejectWithValue }) => {
  try {
    const q = query(collection(db, 'orders'), where('userUid', '==', id));
    const docSnap = await getDocs(q);
    const orders: TOrder[] = [];
    docSnap.forEach(item => {
      orders.push(item.data() as TOrder);
    });
    return orders;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
    throw error;
  }
});

export const getOrdersCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>('orders/ordersCount', async (_, { rejectWithValue }) => {
  try {
    const q = query(collection(db, 'orders'));
    const docSnap = await getCountFromServer(q);
    return docSnap.data().count;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
    throw error;
  }
});

export const changeOrderStatus = createAsyncThunk<
  { id: string; newStatus: TOrder['deliveryStatus'] },
  { id: string; newStatus: TOrder['deliveryStatus'] },
  { rejectValue: string }
>(
  'orders/changeOrderStatus',
  async ({ id, newStatus }, { rejectWithValue }) => {
    try {
      const orderRef = doc(db, 'orders', id);
      await updateDoc(orderRef, {
        deliveryStatus: newStatus,
      });
      return { id, newStatus };
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
      throw error;
    }
  },
);

export const createOrder = createAsyncThunk<
  TOrder,
  {
    formData: CreateOrderValues;
    userData: TUser | null | undefined;
    items: CartMedicine[];
    totalPrice: number;
  }
>(
  'cart/createOrder',
  async (
    { formData, userData, items, totalPrice },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const ordersCount = await dispatch(getOrdersCount()).unwrap();
      const orderUid = nanoid();
      const finalData: TOrder = {
        uid: orderUid,
        userName: formData.name,
        userEmail: formData.email,
        userAddress: formData.address,
        userPhone: formData.phone,
        userUid: userData?.uid || null,
        totalPrice: totalPrice,
        orderItems: items.map(item => {
          return {
            id: item.id,
            name: item.medicineTitle,
            pharmaciesIds: item.pharmacies,
            quantity: item.quantity,
            price: item.price,
          };
        }),
        deliveryStatus: 'Placed',
        orderId: '#' + `${ordersCount}`.padStart(6, '0'),
      };
      const ordersRef = doc(db, 'orders', orderUid);
      await setDoc(ordersRef, finalData);
      return finalData;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
      throw error;
    }
  },
);
