import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyA7_ArL2rdvm3ohqKZYhVW5UlvykFnBZCk',
  authDomain: 'fir-dev-6d47c.firebaseapp.com',
  projectId: 'fir-dev-6d47c',
  storageBucket: 'fir-dev-6d47c.appspot.com',
  messagingSenderId: '1089000708018',
  appId: '1:1089000708018:web:a3805c090b209c0212f6ab',
  measurementId: 'G-NJZ2P2Q9M7',
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const storage = getStorage();
export const auth = getAuth();
export const functions = getFunctions();
export const db = getFirestore();
