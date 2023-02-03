import React from "react";
import Card from "./Card.js";
import Footer from "./Footer.js";
import { currentUserContext } from "../context/CurrentUserContext.js";
export default class Main extends React.Component {
  static contextType = currentUserContext;
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userDescription: "",
      userAvatar: "",
      cards: [],
    };
  }

  render() {
    return (
      <>
        <main className="main">
          <section className="profile page__profile">
            <div className="profile__avatar-info">
              <div className="profile__avatar-background">
                <img
                  src={this.context.avatar}
                  alt="аватар"
                  className="profile__avatar"
                  onClick={this.props.onEditAvatar}
                />
              </div>
              <div className="profile__info">
                <h1 className="profile__name">{this.context.name}</h1>
                <p className="profile__subname">{this.context.about}</p>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={this.props.onEditProfile}
                ></button>
              </div>
            </div>
            <button
              className="profile__add-button"
              type="button"
              onClick={this.props.onAddPlace}
            ></button>
          </section>
          <section className="elements page__elements">
            {this.props.cards.map((card) => {
              return (
                <Card
                  onCardClick={this.props.onCardClick}
                  key={card._id}
                  card={card}
                  onCardLike={this.props.onCardLike}
                  onCardDelete={this.props.onCardDelete}
                />
              );
            })}
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
