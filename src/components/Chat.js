import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import {useAuthState} from "react-firebase-hooks/auth"
import { Context } from '../index';
import {useCollectionData} from "react-firebase-hooks/firestore"
import Loader from './Loader';
import firebase from "firebase";

const Chat = () =>{
  
  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [messages, loading] = useCollectionData(
      firestore.collection('messages').orderBy('createdAt')
  );

  const sendMessage = async () => {
      firestore.collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        body: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      setValue('');
  };

  if(loading) {
    return <Loader/>
}

  return <>
    <Container>
      <Grid container 
            justify={"center"}
            style={{height: window.innerHeight -50, marginTop: 18}}>
              <div style={{width: '80%', height: '72vh', border: '1px solid lightgray', overflowY: "auto", borderRadius: 9}}>
                {messages.map((message)=>{
                 return <>
                  <div style={{
                    margin: 10,
                    border: user.uid === message.uid ? '1px solid blue' : '1px solid gray',
                    marginLeft: user.uid === message.uid ? 'auto' : '10px',
                    width: "fit-content",
                    padding: 5,
                    borderRadius: 9
                    }}>
                    <Grid container >
                        <Avatar src={message.photoURL}/>
                        <div>{message.displayName}</div>
                    </Grid>
                        <div>{message.body}</div>
                  </div>
                 </>
                })}
              </div>
              <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{width: "80%"}}
                  >
                      <TextField fullWidth 
                                 variant={"outlined"} 
                                 rowsMax={2} 
                                 value={value} onChange={e => setValue(e.target.value)}/>
                      <Button variant={"outlined"} onClick={sendMessage}>Send</Button>
                  </Grid>
      </Grid>
        Chat
    </Container>
  </>
};

export default Chat;