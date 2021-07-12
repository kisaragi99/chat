/* eslint-disable no-alert */
import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import { context as Context } from './context';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import s from './App.module.css';
import Loader from './components/Loader';

const App = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{alert(error, user)}</>;
  }
  return (
    <div className={s.mainWrapperAppJs}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
