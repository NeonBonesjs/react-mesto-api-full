import React from "react";
import { useState } from "react";
import FormPage from "./FormPage";
import { Redirect } from "react-router-dom";
// import auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

export default function Register(props) {
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
    props.onRegisterUser(email, pass);
  }
  if (props.loggedIn) {
    return <Redirect to="/react-mesto-auth" />;
  } else if (props.isLoginPage) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className="root">
      <div className="page root__page">
        <FormPage
          title="Регистрация"
          button="Зарегистрироваться"
          underButton={
            <p onClick={props.clickButton} className="form-sign__under-button">
              Уже зарегистрированы? Войти
            </p>
          }
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
      </div>
    </div>
  );
}
