import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
export default function AddPlacePopup(props) {
  const [place, setPlace] = useState("");
  const [placeUrl, setPlaceUrl] = useState("");

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangePlaceUlr(e) {
    setPlaceUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link: placeUrl,
    });
  }

  useEffect(() => {
    setPlace("");
    setPlaceUrl("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="add-photo"
      title="Новое место"
      button="Сохранить"
      children={
        <>
          <div>
            <input
              type="text"
              name="form__name"
              className="popup__form popup__form_type_name"
              value={place}
              onChange={handleChangePlace}
              placeholder="Название"
              id="input-title-photo"
              required
              minLength="2"
              maxLength="30"
            />
            <span id="input-title-photo-error" className="popup__error"></span>
          </div>
          <div>
            <input
              type="url"
              name="form__subname"
              className="popup__form popup__form_type_subname"
              value={placeUrl}
              onChange={handleChangePlaceUlr}
              placeholder="Ссылка на картику"
              id="input-link-photo"
              required
            />
            <span id="input-link-photo-error" className="popup__error"></span>
          </div>
        </>
      }
      onClose={props.onClose}
    />
  );
}
