/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import { auth, firestore, context as Context } from './context';
import App from './App';

ReactDOM.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore,
  }}
  >
    <App />
  </Context.Provider>,
  document.getElementById('root'),
);
