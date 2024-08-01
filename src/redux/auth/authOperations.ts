import { auth, db } from '@/app/firebase';
import { UserRoles } from '@/constants';
import { LoginInputs, SignupInputs } from '@/types/FormType';
import { TUser } from '@/types/UserType';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  ConfirmationResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
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
      role: UserRoles.USER,
      phoneNumber: null,
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

export const apiLoginWithGitHub = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('auth/LoginWGitHub', async (_, { rejectWithValue }) => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const docRef = doc(db, 'users', user.uid);
    const userDataSnapshot = await getDoc(docRef);
    if (!userDataSnapshot.exists()) {
      const serializableUserData: TUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: UserRoles.USER,
        phoneNumber: null,
      };
      await setDoc(doc(db, 'users', user.uid), serializableUserData);
      return serializableUserData;
    }
    return userDataSnapshot.data() as TUser;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
    throw error;
  }
});

export const apiSignupWithPhoneNumber = createAsyncThunk<
  ConfirmationResult['verificationId'],
  SignupInputs | LoginInputs,
  { rejectValue: string }
>('auth/signupWPhone', async (data, { rejectWithValue }) => {
  try {
    const phoneNumber = data?.phone;
    // @ts-ignore: Unreachable code error
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier,
    );
    // @ts-ignore: Unreachable code error
    window.confirmationResult = confirmationResult;
    return confirmationResult.verificationId;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    throw error;
  }
});

export const apiVerificationWithPhone = createAsyncThunk<
  TUser,
  string,
  { rejectValue: string }
>('auth/verificationWPhone', async (code, { rejectWithValue }) => {
  try {
    // @ts-ignore: Unreachable code error
    const confirmationResult = window.confirmationResult;

    const result = await confirmationResult.confirm(code);
    // User signed in successfully.
    const user = result.user;
    const docRef = doc(db, 'users', user.uid);
    const userDataSnapshot = await getDoc(docRef);
    if (!userDataSnapshot.exists()) {
      const serializableUserData: TUser = {
        uid: user.uid,
        email: null,
        displayName: user.displayName || `User ${user.uid.slice(0, 5)}`,
        photoURL: null,
        role: UserRoles.USER,
        phoneNumber: user.phoneNumber,
      };

      await setDoc(doc(db, 'users', user.uid), serializableUserData);
      return serializableUserData;
    }
    return userDataSnapshot.data() as TUser;
  } catch (error) {
    if (error instanceof FirebaseError) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
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

export const apiLoginWithGoogle = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('auth/loginWGoogle', async (_, { rejectWithValue }) => {
  const provider = new GoogleAuthProvider();
  try {
    const user = (await signInWithPopup(auth, provider)).user;
    const docRef = doc(db, 'users', user.uid);
    const userDataSnapshot = await getDoc(docRef);
    if (!userDataSnapshot.exists()) {
      const serializableUserData: TUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: UserRoles.USER,
        phoneNumber: null,
      };
      await setDoc(doc(db, 'users', user.uid), serializableUserData);
      return serializableUserData;
    }
    return userDataSnapshot.data() as TUser;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
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
