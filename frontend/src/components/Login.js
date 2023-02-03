import React from "react";
import { useState } from "react";
import FormPage from "./FormPage";
import InfoTooltip from "./InfoTooltip";
import { Redirect } from "react-router-dom";
export default function Login(props) {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePass(e) {
    setPass(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLoginUser(email, pass);
  }

  if (props.loggedIn) {
    return <Redirect to="/react-mesto-auth" />;
  } else if (!props.isLoginPage) {
    return <Redirect to="/sign-up" />;
  }

  return (
    <>
      <FormPage
        title="Вход"
        button="Войти"
        inputValue1={email || ""}
        inputOnChange1={handleChangeEmail}
        inputValue2={pass || ""}
        inputOnChange2={handleChangePass}
        onSubmit={handleSubmit}
      />
      <InfoTooltip
        isOpen={props.isOpen}
        onClose={props.onClose}
        isSucsess={props.isSucsess}
      />
    </>
  );
}
