/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import s from './FormTextButton.module.css';
import sendMessageImage from '../../utils/sendMessage.svg';

const FormTextButton = ({ sendMessage, register, handleSubmit }) => {
  const desktop = useMediaQuery('(min-width:769px)');

  return (
    <>
      <form onSubmit={handleSubmit(sendMessage)} className={s.formInputWrapper}>

        <TextareaAutosize
          className={s.textAreaAuto}
          {...register('messageBody', { required: true, maxLength: 900 })}
          autoComplete="off"
          placeholder="type here"
          maxRows={desktop ? 1 : 5}
        />

        <button type="submit" className={s.messageSendButton}>
          <img alt="send" src={sendMessageImage} className={s.messageSendButtonImage} />
        </button>

      </form>
    </>
  );
};

export default FormTextButton;
