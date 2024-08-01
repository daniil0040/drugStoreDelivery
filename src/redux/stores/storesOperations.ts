import { db } from '@/app/firebase';
import { Medicine, Store } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  collection,
  // doc,
  // getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export const apiGetStores = createAsyncThunk<
  Store[],
  void,
  { rejectValue: string }
>('stores/getStores', async (_, { rejectWithValue }) => {
  try {
    const docRef = collection(db, 'pharmacies');
    const docSnap = await getDocs(docRef);
    const stores: Store[] = [];
    docSnap.forEach(item => stores.push(item.data() as Store));
    return stores;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
    throw error;
  }
});

export const apiGetMedicinesByPharmacy = createAsyncThunk<
  Medicine[],
  string,
  { rejectValue: string }
>(
  'stores/getMedicinesByPharmacy',
  async (pharmacyName, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, 'medicines'),
        where('pharmacies', 'array-contains', pharmacyName),
      );
      const docSnap = await getDocs(q);
      const medicines: Medicine[] = [];
      docSnap.forEach(item => medicines.push(item.data() as Medicine));
      return medicines;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message;
        return rejectWithValue(errorMessage);
      }
      throw error;
    }
  },
);
