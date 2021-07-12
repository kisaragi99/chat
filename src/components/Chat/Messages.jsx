/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import s from './Messages.module.css';
import { context as Context } from '../../context';

const Messages = ({ messages, user }) => {
  const { firestore } = useContext(Context);

  const [deleteMessageId, setDeleteMessageId] = useState('');

  const deleteMessage = (messageId) => {
    firestore.collection('messages').doc(messageId).delete();
    setDeleteMessageId('');
  };

  return (
    <>
      <div className={s.innerContainer}>
        <ScrollToBottom
          debug={false}
          initialScrollBehavior="auto"
          animatingToEnd={false}
          checkInterval={17}
        >
          {messages.map((message) => (
            <div key={message.id}>
              <div className={user.uid === message.uid
                ? s.messageContainerSelf : s.messageContainerOthers}
              >

                <div className={s.avatarNameIconsContainer}>
                  <img className={s.avatarImage} src={message.photoURL} alt="avatar" />
                  <div className={s.displayName}>{message.displayName}</div>
                  <div className={s.messageSentTime}>{message.createdAt && message.createdAt.toDate().toLocaleTimeString('rus-RU')}</div>

                  {(deleteMessageId === message.id) && (user.uid === message.uid)
                    && (
                      <>
                        <DeleteIcon
                          onClick={() => { deleteMessage(message.id); }}
                          style={{ color: 'gray', cursor: 'pointer', height: 23 }}
                        />
                        <DoneIcon
                          variant="outlined"
                          style={{ color: 'gray', cursor: 'pointer', height: 23 }}
                          onClick={() => { setDeleteMessageId(''); }}
                        />
                      </>
                    )}
                </div>

                <div className={s.messageBody} role="presentation" onClick={() => { setDeleteMessageId(message.id); }}>
                  {message.body}
                </div>

              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
    </>
  );
};

export default Messages;
