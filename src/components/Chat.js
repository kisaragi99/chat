import { Button, Container, Grid, TextField, useMediaQuery } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import React, { useContext, useState } from 'react';
import {useAuthState} from "react-firebase-hooks/auth"
import { Context } from '../index';
import {useCollectionData} from "react-firebase-hooks/firestore"
import Loader from './Loader';
import firebase from "firebase";
import s from './Chat.module.css';
import ReactScrollableFeed from 'react-scrollable-feed';


const Chat = () =>{
  
  const mediaMobile = useMediaQuery("(max-width: 768px)")
  
  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [messages, loading] = useCollectionData(
      firestore.collection('messages').orderBy('createdAt'), {idField: "id"}
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
  
  // firestore.collection('messages').doc(message.id).delete(); - If u want to delete a message(document)
  const [deleteMessageId, setDeleteMessageId] = useState('');

  if(loading) {
    return <Loader/>
  }

  if(!user) {
  return <Loader/>
  }
console.log('render', deleteMessageId)
  return <>
    <Container maxWidth="md" className={s.mainContainer} >
      <Grid container
            justify="center"
            style={mediaMobile ? {height: window.innerHeight -108, marginTop: 48, width: '100%' } : {height: window.innerHeight -63, marginTop: 62 } }
            spacing = {mediaMobile ? 0 : 0 }
            >
            
              <div className={s.innerContainer}>
              <ReactScrollableFeed>
                {messages.map((message)=>{
                 return <div key={message.id}>
                  <div className={user.uid === message.uid ? s.messageContainerSelf : s.messageContainerOthers}>

                    <div className={s.avatarNameIconsContainer}>
                        <img className={s.avatarImage} src={message.photoURL} alt={'avatar'}/>
                        <div className={s.displayName}>{message.displayName}</div>
                        {deleteMessageId === message.id ? user.uid === message.uid ? <> 
                        <DeleteIcon 
                        onClick={()=>{
                          firestore.collection('messages').doc(message.id).delete() 
                          setDeleteMessageId('');
                        }} 
                        style={{color: 'gray', cursor: 'pointer'}}>
                        </DeleteIcon>
                        {deleteMessageId !== '' ? user.uid === message.uid ? 
                        <DoneIcon variant={"outlined"} style={{color: 'gray', cursor: 'pointer'}} onClick={()=>{setDeleteMessageId('')}}>
                        </DoneIcon> : null : null}
                        </>       
                        : null : null}

                    </div>

                    <div className={s.messageBody} onClick={()=>{setDeleteMessageId(message.id)}}>{message.body}</div>

                  </div>
                 </div>
                })}
                </ReactScrollableFeed>
              </div>
              

              <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    className={s.textFieldGrid}
                    style={mediaMobile ? {width: '100%', marginTop: '0'} : {width: '80%', marginTop: '20px'}}
                    spacing = {0}>

                      <TextField fullWidth 
                                 variant={"outlined"} 
                                 rowsMax={2} 
                                 value={value} 
                                 onChange={e => setValue(e.target.value)} 
                                 placeholder={"type here"}
                                 inputProps={{ maxLength: 900 }}
                                 style={{borderRadius: "25px"}}
                                 spacing ={0}
                      />
                      {value.length > 0 ? <Button variant={"outlined"} onClick={sendMessage}>Send</Button> : null}
                      
                  </Grid>
                  
      </Grid>
    </Container>
  </>
};

export default Chat;