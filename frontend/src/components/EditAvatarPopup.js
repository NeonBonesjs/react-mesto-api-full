import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
export default function EditAvatarPopup(props) {
  // const[avatar, setAvatar] = useState();
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      children={
        <div>
          <input
            type="url"
            name="form__subname"
            className="popup__form popup__form_type_subname"
            // value={avatar}
            // onChange={setAvatar}
            placeholder="Ссылка на картику"
            id="input-link-photo-avatar"
            required
            ref={inputRef}
          />
          <span
            id="input-link-photo-avatar-error"
            className="popup__error"
          ></span>
        </div>
      }
      onClose={props.onClose}
    />
  );
}
