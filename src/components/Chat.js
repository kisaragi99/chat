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
import { useForm } from "react-hook-form";


const Chat = () =>{
  
  const { register, handleSubmit, reset } = useForm();
  
  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
      firestore.collection('messages').orderBy('createdAt'), {idField: "id"}
  );

  const sendMessage = async (data) => {
      firestore.collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        body: data.messageBody,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      reset();
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
    <div className={s.mainContainer} >
      <div className={s.secondMainContainer}>
            
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

              <form onSubmit={handleSubmit(sendMessage)} className={s.formInputWrapper}>
                  <input 
                  placeholder="type here" 
                  {...register("messageBody",{ required: true, maxLength: 900 })} 
                  className={s.messageInput} 
                  autoComplete="off" 
                  />
                  <input value="send" type="submit" className={s.messageSendButton}></input>
              </form>





                  
      </div>
    </div>
  </>
};

export default Chat;