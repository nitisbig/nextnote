import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBHY6LL8TByCxL2eUEIS5QJ-gSVEWqhk',
  authDomain: 'first-a25dd.firebaseapp.com',
  projectId: 'first-a25dd',
  storageBucket: 'first-a25dd.firebasestorage.app',
  messagingSenderId: '816341509884',
  appId: '1:816341509884:web:d34dd58199473b3c841979',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
