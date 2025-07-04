
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAaGPV-15fUn4XRHB0rbW-0OuK81YHXqIQ",
  authDomain: "lovable-568ae.firebaseapp.com",
  projectId: "lovable-568ae",
  storageBucket: "lovable-568ae.firebasestorage.app",
  messagingSenderId: "38031704023",
  appId: "1:38031704023:web:1d080fd5cccf4d04efd592",
  measurementId: "G-9TZ8YPWZNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;
