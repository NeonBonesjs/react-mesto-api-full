import React from "react";
export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${props.isOpen}`}
      id="popup-edit"
      onClick={props.onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__forms"
          name={props.name}
          id="form-edit"
          onSubmit={props.onSubmit}
          // noValidate
        >
          {props.children}
          <button
            type="submit"
            className="popup__button-save"
            id="submit-profile"
          >
            {props.button}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
