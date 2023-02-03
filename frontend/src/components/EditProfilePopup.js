import React, { useContext, useState, useEffect } from "react";

import { currentUserContext } from "../context/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
export default function EditProfilePopup(props) {
  const currentUser = useContext(currentUserContext);

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      children={
        <>
          <div>
            <input
              type="text"
              name="form__name"
              className="popup__form popup__form_type_name"
              value={name || ""}
              onChange={handleChangeName}
              id="input-profile-name"
              required
              placeholder="Имя пользователя"
              minLength="2"
              maxLength="40"
            />
            <span id="input-profile-name-error" className="popup__error"></span>
          </div>
          <div>
            <input
              type="text"
              name="form__subname"
              placeholder="О себе"
              className="popup__form popup__form_type_subname"
              value={description || ""}
              onChange={handleChangeDescription}
              id="input-profile-subname"
              required
              minLength="2"
              maxLength="200"
            />
            <span
              id="input-profile-subname-error"
              className="popup__error"
            ></span>
          </div>
        </>
      }
      button="Сохранить"
      onClose={props.onClose}
    />
  );
}
