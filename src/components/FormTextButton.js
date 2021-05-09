import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import s from "./Chat.module.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import sendMessageImage from "./../../src/utils/send.svg";

const FormTextButton = (props) => {
  const desktopMedia = useMediaQuery("(min-width:769px)");
  // @media query for mobile

  return (
    <>
      <form
        onSubmit={props.handleSubmit(props.sendMessage)}
        className={s.formInputWrapper}
      >
        <TextareaAutosize
          className={s.textAreaAuto}
          {...props.register("messageBody", { required: true, maxLength: 900 })}
          autoComplete="off"
          placeholder={"type here"}
          maxRows={desktopMedia ? 1 : 5}
        />

        <button type="submit" className={s.messageSendButton}>
          <img
            alt=""
            src={sendMessageImage}
            className={s.messageSendButtonImage}
          ></img>
        </button>
      </form>
    </>
  );
};

export default FormTextButton;
