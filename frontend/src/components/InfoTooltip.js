import React from "react";
import sucsessIcon from "../image/icon.svg";
import failIcon from "../image/Union.svg";
export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen}`}>
      <div className="popup__container">
        <img
          src={props.isSucsess ? sucsessIcon : failIcon}
          className="popup__icon"
          alt={sucsessIcon ? "галочка" : "крестик"}
        />
        <p
          className="popup__title"
          style={{
            textAlign: "center",
            margin: "32px 0 60px 0",
            alignSelf: "center",
          }}
        >
          {props.isSucsess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
