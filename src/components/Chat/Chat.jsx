import React, { useContext } from 'react';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { context as Context } from '../../context';
import Loader from '../Loader';
import s from './Chat.module.css';
import Messages from './Messages';
import FormTextButton from './FormTextButton';

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt'),
    { idField: 'id', snapshotListenOptions: { includeMetadataChanges: true } },
  ); // react-firebase-hooks to get collection data.

  const { register, handleSubmit, reset } = useForm();

  const sendMessage = async (data) => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      body: data.messageBody,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    reset();
  };

  if (loading || !user) { return <Loader />; }

  return (
    <>
      <div className={s.mainContainer}>
        <div className={s.secondMainContainer}>
          <Messages user={user} messages={messages} />
          <FormTextButton
            sendMessage={sendMessage}
            register={register}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
