import React from "react";
import { currentUserContext } from "../context/CurrentUserContext.js";
export default class Card extends React.Component {
  static contextType = currentUserContext;

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  };

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  };

  handleDeleteClick = () => {
    this.props.onCardDelete(this.props.card);
  };
  render() {
    this.isOwn = this.props.card.owner._id === this.context._id;
    return (
      <div className="element">
        <img
          src={this.props.card.link}
          className="element__image"
          alt="картинка не смогла загрузиться или ссылка неверная"
          onClick={this.handleClick}
        />
        <div className="element__name-like">
          <h2 className="element__name">{this.props.card.name}</h2>
          <div className="element__like-plus-number">
            <button
              className={`element__like-button ${
                this.props.card.likes.some((i) => i._id === this.context._id)
                  ? "element__like-button_active"
                  : ""
              }`}
              type="button"
              onClick={this.handleLikeClick}
            />
            <p className="element__number-like">
              {this.props.card.likes.length}
            </p>
          </div>
        </div>
        <button
          type="button"
          className={`element__trash ${
            !this.isOwn ? "element__trash_invisible" : ""
          }`}
          onClick={this.handleDeleteClick}
        />
      </div>
    );
  }
}
