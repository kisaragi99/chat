/* eslint-disable linebreak-style */
import React, { useContext } from 'react';
import {
  AppBar, Toolbar, Grid, Button,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LOGIN_ROUTE } from '../utils/consts';
import { context as Context } from '../context';

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <>
      <AppBar color="primary" position="fixed">
        <Toolbar variant="dense">
          <Grid container justify="flex-end">

            {user
              ? <Button onClick={() => auth.signOut()} variant="outlined" style={{ color: 'white' }}>Log out</Button>
              : (
                <NavLink to={LOGIN_ROUTE}>
                  <Button variant="outlined">Login</Button>
                </NavLink>
              )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
