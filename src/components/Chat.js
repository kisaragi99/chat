import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
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

  // these messages now have an id, so it is possible to delete them.
  useEffect(()=>{
    const fetchData = async ()=>{
      const test223 = firebase.firestore();
      const test223Data = await test223.collection('messages').get();
      const newMessages = test223Data.docs.map(doc => ({...doc.data(), id223: doc.id}))
      console.log(newMessages);
    }
    fetchData();
  },[])
 

  const sendMessage = async () => {
      firestore.collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        body: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
        // Добавить id Документа
      })
      setValue('');
  };


  const getMessages = async () => {
    const result = await firestore.collection('messages').get();
    const allMessages = result.docs;
    const messagesId = [];
    allMessages.forEach((message) => messagesId.push(message.id));
    console.log(messagesId);
  }
  
 // firestore.collection('messages').doc("TVnTK9JWNVpNA19SEEeE").delete(); - If u want to delete a message(document)

  if(loading) {
    return <Loader/>
}
  if(!user) {
  return <Loader/>
}

  return <>
    <Container>
      <Grid container 
            justify={"center"}
            style={{height: window.innerHeight -50, marginTop: 63}}>
              <div style={{width: '80%', height: '72vh', border: '1px solid lightgray', overflowY: "auto", borderRadius: 9}}>
                {messages.map((message)=>{
                 return <>
                  <div style={{
                    margin: 10,
                    border: user.uid === message.uid ? '1px solid blue' : '1px solid gray',
                    marginLeft: user.uid === message.uid ? 'auto' : '10px',
                    width: "fit-content",
                    padding: 5,
                    borderRadius: 9,
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
                  ><Button onClick={ getMessages } variant={"outlined"}>Get messages id</Button>
                      <TextField fullWidth 
                                 variant={"outlined"} 
                                 rowsMax={2} 
                                 value={value} 
                                 onChange={e => setValue(e.target.value)} 
                                 placeholder={"type here"} />
                      {value.length > 0 ? <Button variant={"outlined"} onClick={sendMessage}>Send</Button> : null}
                  </Grid>
      </Grid>
    </Container>
  </>
};

export default Chat;