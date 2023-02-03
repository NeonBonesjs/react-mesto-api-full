import React from "react";
// import { Link } from "react-router-dom";
export default function FormPage(props) {
  return (
    <form className="form-sing" onSubmit={props.onSubmit}>
      <h2 className="form-sing__title">{props.title}</h2>
      <input
        className="form-sing__input"
        placeholder="Email"
        value={props.inputValue1}
        onChange={props.inputOnChange1}
        minLength="6"
        maxLength="100"
        type="email"
        id="form-sing-input1"
      ></input>
      <input
        className="form-sing__input"
        placeholder="Пароль"
        value={props.inputValue2}
        onChange={props.inputOnChange2}
        minLength="6"
        maxLength="13"
        type="password"
        id="form-sing-input2"
      ></input>
      <button type="submit" className="form-sing__submit">
        {props.button}
      </button>
      {props.underButton}
    </form>
  );
}
