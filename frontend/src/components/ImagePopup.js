import React from "react";
export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_photo ${props.isOpen}`}
      onClick={props.onClose}
    >
      <div className="popup__text-image" onClick={(e) => e.stopPropagation()}>
        <img
          src={props.card === null ? "#" : props.card.link}
          alt=""
          className="popup__image"
        />
        <p className="popup__text">{props?.card?.name ?? ""}</p>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
