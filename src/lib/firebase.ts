import { FirebaseApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAwkFoFMyb4uSZAqKLSqtyajCQ2F85XG5I",
  authDomain: "zentrovai.firebaseapp.com",
  projectId: "zentrovai",
  storageBucket: "zentrovai.firebasestorage.app",
  messagingSenderId: "174762875902",
  appId: "1:174762875902:web:7a7169c1e301361b443eaf",
  measurementId: "G-1RHSCCHGSY"
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.length > 0,
);

export const firebaseApp: FirebaseApp | null = isFirebaseConfigured
  ? getApps()[0] ?? initializeApp(firebaseConfig)
  : null;