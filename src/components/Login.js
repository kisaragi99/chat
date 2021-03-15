import { Box, Button, Container, Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import {Context} from "../index.js"
import firebase from "firebase"

const Login = () =>{

  const {auth} = useContext(Context)

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const {user} = await auth.signInWithPopup(provider);
    console.log(user)
  }

  return <>
    <Container>
      <Grid container 
            style={{height: window.innerHeight -50}} 
            alignItems={"center"} 
            justify={"center"}>
              <Grid style={{width: 450, background: "lightgray", borderRadius: 9}} 
                    container 
                    alignItems={"center"} 
                    justify={"center"} >
                <Box p={5}>
                  <Button onClick={login}
                          variant={"outlined"}>Login with Google</Button>
                </Box>
              </Grid>
      </Grid>
    </Container>
  </>
};

export default Login;