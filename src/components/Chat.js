import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import React, { useContext, useState } from 'react';
import {useAuthState} from "react-firebase-hooks/auth"
import { Context } from '../index';
import {useCollectionData} from "react-firebase-hooks/firestore"
import Loader from './Loader';
import firebase from "firebase";
import s from './Chat.module.css';
import { useForm } from "react-hook-form";
import ScrollToBottom from 'react-scroll-to-bottom';
import TextareaAutosize from 'react-textarea-autosize';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import sendMessageImage from './../../src/utils/send.svg'


const Chat = () =>{
  
  const desktopMedia = useMediaQuery('(min-width:769px)');

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
      console.log(data);
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

console.log('render')
  return <>
    <div className={s.mainContainer} >
      <div className={s.secondMainContainer}>
            
              <div className={s.innerContainer}>
              <ScrollToBottom 
              debug={false} 
              initialScrollBehavior={'auto'} 
              animatingToEnd={false}
              followButtonClassName={s.scrollToBottomButton} 
              >
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
                </ScrollToBottom>
              </div>

              <form onSubmit={handleSubmit(sendMessage)} className={s.formInputWrapper}>
                  <TextareaAutosize 
                  className={s.textAreaAuto} 
                  {...register("messageBody",{ required: true, maxLength: 900 })}
                  autoComplete="off"
                  placeholder="type here"
                  maxRows = {desktopMedia ? 1 : 5}
                   />
                  <button type="submit" className={s.messageSendButton}>
                    <img alt="" src={sendMessageImage} className={s.messageSendButtonImage}></img>
                  </button>
                  
              </form>
              

      </div>
    </div>
  </>
};

export default Chat;