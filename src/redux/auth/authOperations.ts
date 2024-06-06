import { auth, db } from '@/app/firebase';
import { LoginInputs, SignupInputs } from '@/types/FormType';
import { TUser } from '@/types/UserType';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const apiSignupWithEmail = createAsyncThunk<
  TUser,
  SignupInputs,
  { rejectValue: string }
>('auth/signupWEmail', async (data, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    // Signed up
    const user = userCredential.user;
    console.log(user);
    const serializableUserData: TUser = {
      uid: user.uid,
      email: user.email,
      displayName: data.name,
      photoURL: null,
    };
    await setDoc(doc(db, 'users', user.uid), serializableUserData);
    return serializableUserData;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
    throw error;
  }
});

export const apiSignupWithGoogle = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('auth/signupWGoogle', async (_, { rejectWithValue }) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const serializableUserData: TUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    await setDoc(doc(db, 'users', user.uid), serializableUserData);
    return serializableUserData;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    throw error;
  }
});

export const apiLoginWithEmail = createAsyncThunk<
  TUser,
  LoginInputs,
  { rejectValue: string }
>('auth/LoginWEmail', async (data, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    // Signed in
    const user = userCredential.user;
    // ...
    const docRef = doc(db, 'users', user.uid);
    const serializedUserData = (await getDoc(docRef)).data() as TUser;
    return serializedUserData;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
    throw error;
  }
});

export const apiSignoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/SignoutUser', async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
    throw error;
  }
});
