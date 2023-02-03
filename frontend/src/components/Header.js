import React, { useState } from "react";
import logo from "../image/logo.svg";
export default function Header(props) {
  const [active, setActive] = useState(false);
  const handleButton = () => {
    setActive(!active);
  };
  return (
    <header className="header page__header">
      <img src={logo} alt="лого" className="logo" />
      {props.loggedIn ? (
        <>
          <div
            className={`header__burger ${active ? "active" : ""}`}
            onClick={handleButton}
          >
            <span></span>
          </div>
          <div className={`header__menu ${active ? "active" : ""}`}>
            <div className="header__email-button">
              <p className="header__email">{props.email}</p>
              <button
                className="header__button"
                to={props.link}
                onClick={props.clickButton}
              >
                {props.button}
              </button>
            </div>
          </div>
        </>
      ) : (
        <button
          className="header__button"
          to={props.link}
          onClick={props.clickButton}
        >
          {props.button}
        </button>
      )}
      {/* <div className="header__email-button">
        <p className="header__email">
          {props.email}
        </p>
        <button className="header__button" to={props.link} onClick={props.clickButton} >
          {props.button}
        </button>
      </div> */}
    </header>
  );
}
