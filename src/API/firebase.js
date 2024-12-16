import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_apiKey,
//   authDomain: import.meta.env.VITE_APP_authDomain,
//   projectId: import.meta.env.VITE_APP_projectId,
//   storageBucket: import.meta.env.VITE_APP_storageBucket,
//   messagingSenderId: import.meta.env.VITE_APP_messagingSenderId,
//   appId: import.meta.env.VITE_APP_appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCB04b4vMYQ44mkdvu39qbLR0_HZj-V_JQ",
  authDomain: "szu-file-manager.firebaseapp.com",
  databaseURL: "https://szu-file-manager-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "szu-file-manager",
  storageBucket: "szu-file-manager.firebasestorage.app",
  messagingSenderId: "494898031180",
  appId: "1:494898031180:web:4863beed02b8e99c04e2e9",
  measurementId: "G-PGEB5064H5"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  docs: firestore.collection('docs'),
  files: firestore.collection('files'),
  date: firebase.firestore.FieldValue.serverTimestamp(),
};

export const storage = firebase.storage();

export const auth = firebase.auth();
