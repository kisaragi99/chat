import React, {useState, useContext} from 'react';
import { Context } from '../index';
import ScrollToBottom from 'react-scroll-to-bottom';
import s from './Chat.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

const Messages = (props) =>{
  
  const {firestore} = useContext(Context);
  
  const [deleteMessageId, setDeleteMessageId] = useState('');

  const deleteMessage = (messageId)=>{
    firestore.collection('messages').doc(messageId).delete() 
    setDeleteMessageId('');
  };

  return <> <div className={s.innerContainer}>
              <ScrollToBottom 
              debug={false}
              initialScrollBehavior='auto'
              animatingToEnd={false}
              checkInterval={17}
              >
                
                {props.messages.map((message)=>{
                 return <div key={message.id}>
                  <div className={props.user.uid === message.uid ? s.messageContainerSelf : s.messageContainerOthers}>

                    <div className={s.avatarNameIconsContainer}>
                        <img className={s.avatarImage} src={message.photoURL} alt={'avatar'}/>
                        <div className={s.displayName}>{message.displayName}</div>
                        <div className={s.messageSentTime}>{message.createdAt ? message.createdAt.toDate().toLocaleTimeString('rus-RU') : null}</div>

                        {deleteMessageId === message.id ? props.user.uid === message.uid ? 
                        <> 
                          <DeleteIcon 
                            onClick={()=>{deleteMessage(message.id)}} 
                            style={{color: 'gray', cursor: 'pointer', height: 23}}> 
                          </DeleteIcon>

                        {deleteMessageId !== '' ? props.user.uid === message.uid ? 
                          <DoneIcon 
                          variant={"outlined"} 
                          style={{color: 'gray', cursor: 'pointer', height: 23}} 
                          onClick={()=>{setDeleteMessageId('')}}>
                          </DoneIcon> : null : null}
                        </>
                        : null : null
                        }

                    </div>

                    <div className={s.messageBody} onClick={()=>{setDeleteMessageId(message.id)}}>{message.body}</div>

                  </div>
                 </div>
                })}
                </ScrollToBottom>
                </div>
  </>
};

export default Messages;