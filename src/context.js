/* eslint-disable linebreak-style */
/* eslint linebreak-style: ["error", "windows"] */
import { createContext } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCMbRvCy-t_DIP-9DpkaV9jlQbTbHQal8c',
  authDomain: 'simple-chat-35a9e.firebaseapp.com',
  projectId: 'simple-chat-35a9e',
  storageBucket: 'simple-chat-35a9e.appspot.com',
  messagingSenderId: '1004470360972',
  appId: '1:1004470360972:web:fd7896e2d52bc9095854a9',
  measurementId: 'G-B1Y34C3S22',
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const context = createContext(null);
