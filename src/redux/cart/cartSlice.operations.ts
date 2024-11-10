import { db } from '@/app/firebase';
import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { RootState } from '../store';
import { CartMedicine } from '@/types/MedicineType';

export const apiCreateCartForLoggedUser = createAsyncThunk<
  { status: 'idle' | 'success' | 'error' | 'pending'; items: CartMedicine[] },
  string,
  { rejectValue: string }
>(
  'cart/apiCreateCartForLoggedUser',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const cartItems = (getState() as RootState).cart.cartItems;
      const ref = collection(db, 'carts');
      const q = query(ref, where('userUid', '==', userId));
      const querySnapshot = await getDocs(q);
      const userCartAlreadyExists = Boolean(querySnapshot.docs[0]);
      if (!userCartAlreadyExists) {
        const uid = nanoid();
        await setDoc(doc(db, 'carts', uid), {
          medicines: cartItems,
          uid,
          userUid: userId,
        });
        return { status: 'success', items: cartItems };
      }
      return {
        status: 'success',
        items: querySnapshot.docs[0].data().medicines as CartMedicine[],
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
      throw error;
    }
  },
);

export const apiUpdateCartForLoggedUser = createAsyncThunk<
  void,
  CartMedicine[],
  { rejectValue: string }
>(
  'cart/apiUpdateCartForLoggedUser',
  async (cartItems, { rejectWithValue, getState }) => {
    try {
      const userId = (getState() as RootState).auth.userData?.uid as string;
      const colectionRef = collection(db, 'carts');
      const q = query(colectionRef, where('userUid', '==', userId));
      const querySnapshot = await getDocs(q);
      const userCart = querySnapshot.docs[0].data();

      const cartRef = doc(db, 'carts', userCart.uid);

      await updateDoc(cartRef, {
        medicines: cartItems,
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
      throw error;
    }
  },
);
