import React from "react";
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts"

const Navbar = () => {
  const user = true;

  return (
    <>
      <AppBar color={"primary"} position="static">
        <Toolbar>
          <Grid container justify={"flex-end"}>
            {user ? 
              <Button variant={"outlined"}>Log out</Button> 
              : 
              <NavLink to={LOGIN_ROUTE}>
                <Button variant={"outlined"}>Login</Button>
              </NavLink>}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
