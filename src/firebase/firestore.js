// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCPQHcs4U1dbE1dSlIS39QEgjGliQwBAoY',
  authDomain: 'f-ingreso-gasto.firebaseapp.com',
  projectId: 'f-ingreso-gasto',
  storageBucket: 'f-ingreso-gasto.firebasestorage.app',
  messagingSenderId: '986821902638',
  appId: '1:986821902638:web:ff2c3a96f8f7ee0c403abf',
  measurementId: 'G-NH1JXSFX0Z',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
