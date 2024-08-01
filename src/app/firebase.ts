// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVjlPX3Hlj-ySG9_tsYwxA1HudwWqHeDk',
  authDomain: 'drugstore-420819.firebaseapp.com',
  projectId: 'drugstore-420819',
  storageBucket: 'drugstore-420819.appspot.com',
  messagingSenderId: '437420903341',
  appId: '1:437420903341:web:a9a376dd5946d692c02f24',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
auth.languageCode = 'en';
