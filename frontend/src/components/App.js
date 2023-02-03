// import './App.css';
import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import api from "../utils/api.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { currentUserContext } from "../context/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import auth from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoTooltipOpen: false,
      selectedCard: null,
      currentUser: {},
      cards: [],
      loggedIn: false,
      isSucsess: false,
      email: "",
      isLoginPage: true,
    };
  }

  handleisInfoTooltip = () => {
    this.setState({ isInfoTooltipOpen: true });
  };

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  };

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  closeAllPopup = () => {
    this.setState({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: null,
      isInfoTooltipOpen: false,
    });
  };

  handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then((res) => {
        this.setState({ currentUser: res });
      })
      .then((res) => this.closeAllPopup())
      .catch((err) => console.log(`Error: ${err}`));
  };

  handleUpdateAvatar = (data) => {
    api
      .editAvatar(data)
      .then((res) => this.setState({ currentUser: res }))
      .then((res) => this.closeAllPopup())
      .catch((err) => console.log(`Error: ${err}`));
  };

  getCards = () => {
    if (this.state.loggedIn) {
      api
        .getInitialCard()

        .then((res) => {
          this.setState({
            cards: res,
          });
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  getUserInfo = () => {
    if (this.state.loggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          this.setState({ currentUser: res });
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  handleCardLike = (card) => {
    const isLiked = card.likes.some(
      (i) => i._id === this.state.currentUser._id
    );
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        this.setState({
          cards: this.state.cards.map((c) =>
            c._id === card._id ? newCard : c
          ),
        });
      })
      .catch((err) => console.log(`Error: ${err}`));
  };

  handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then((res) => {
        this.setState({
          cards: this.state.cards.filter((c) => {
            return !(c._id === card._id);
          }),
        });
      })
      .catch((err) => console.log(`Error: ${err}`));
  };

  handleAddPlaceSubmit = (card) => {
    api
      .addNewCard(card)
      .then((newCard) => {
        this.setState({ cards: [newCard, ...this.state.cards] });
      })
      .then((res) => this.closeAllPopup())
      .catch((err) => console.log(`Error: ${err}`));
  };

  handleRegisterUser = (email, pass) => {
    auth
      .register(email, pass)
      .then((res) => {
        this.props.history.push("/sign-in");
        this.setState({ isSucsess: true });
        this.setState({ isInfoTooltipOpen: true });
      })
      .catch((err) => {
        this.setState({ isSucsess: false });
        this.setState({ isInfoTooltipOpen: true });
      });
    // .finally(this.setState({isInfoTooltipOpen: true}))
  };

  handleLoginUser = (email, pass) => {
    auth
      .authorize(email, pass)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          auth.getUserEmail(localStorage.getItem("token")).then((data) => {
            this.setState({ email: data.data.email });
          });
        }
      })
      .then(() => {
        this.setState({ loggedIn: true });
        this.setState({ isLoginPage: false });
      })
      .catch(() => {
        this.setState({ isSucsess: false });
        this.setState({ isInfoTooltipOpen: true });
      });
  };

  handleButtonClick = () => {
    if (this.state.loggedIn) {
      localStorage.removeItem("token");
      this.setState({ loggedIn: false });
      this.setState({ email: "" });
      this.setState({ isLoginPage: true });
    } else {
      if (this.state.isLoginPage) {
        this.setState({ isLoginPage: false });
      } else {
        this.setState({ isLoginPage: true });
      }
    }
  };

  tokenCheck = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .getUserEmail(jwt)
        .then((res) => {
          this.setState({ email: res.data.email });
        })
        .then(() => {
          this.setState({ loggedIn: true });
          this.setState({ isLoginPage: false });
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  };

  componentDidMount() {
    this.tokenCheck();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loggedIn !== prevState.loggedIn) {
      this.getUserInfo();
      this.getCards();
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextState.loggedIn !== true){
  //     return false
  //   }
  // }

  render() {
    return (
      <currentUserContext.Provider value={this.state.currentUser}>
        <div className="root">
          <div className="page root__page">
            <Header
              button={
                this.state.loggedIn
                  ? "Выйти"
                  : this.state.isLoginPage
                  ? "Регистрация"
                  : "Войти"
              }
              email={this.state.email}
              clickButton={this.handleButtonClick}
              loggedIn={this.state.loggedIn}
            />
            <Switch>
              {/* <Route exact path="/">
                <Main
                  onEditAvatar={this.handleEditAvatarClick}
                  onEditProfile={this.handleEditProfileClick}
                  onAddPlace={this.handleAddPlaceClick}
                  onCardClick={this.handleCardClick}
                  onCardLike={this.handleCardLike}
                  onCardDelete={this.handleCardDelete}
                  cards={this.state.cards}
                />
                
              </Route> */}
              <ProtectedRoute
                exact
                path="/react-mesto-auth"
                loggedIn={this.state.loggedIn}
                component={Main}
                onEditAvatar={this.handleEditAvatarClick}
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onCardClick={this.handleCardClick}
                onCardLike={this.handleCardLike}
                onCardDelete={this.handleCardDelete}
                cards={this.state.cards}
              />
              <Route path="/sign-up">
                <Register
                  isSucsess={this.state.isSucsess}
                  isOpen={this.state.isInfoTooltipOpen ? "popup_active" : ""}
                  onClose={this.closeAllPopup}
                  onRegisterUser={this.handleRegisterUser}
                  loggedIn={this.state.loggedIn}
                  isLoginPage={this.state.isLoginPage}
                  clickButton={this.handleButtonClick}
                />
              </Route>
              <Route path="/sign-in">
                <Login
                  isSucsess={this.state.isSucsess}
                  isOpen={this.state.isInfoTooltipOpen ? "popup_active" : ""}
                  onClose={this.closeAllPopup}
                  onLoginUser={this.handleLoginUser}
                  loggedIn={this.state.loggedIn}
                  isLoginPage={this.state.isLoginPage}
                />
              </Route>
              <Route>
                {this.state.loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Redirect to="/sign-in" />
                )}
              </Route>
            </Switch>
            <EditProfilePopup
              isOpen={this.state.isEditProfilePopupOpen ? "popup_active" : ""}
              onClose={this.closeAllPopup}
              onUpdateUser={this.handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={this.state.isAddPlacePopupOpen ? "popup_active" : ""}
              onClose={this.closeAllPopup}
              onAddPlace={this.handleAddPlaceSubmit}
              cards={this.state.cards}
            />
            <EditAvatarPopup
              isOpen={this.state.isEditAvatarPopupOpen ? "popup_active" : ""}
              onClose={this.closeAllPopup}
              onUpdateAvatar={this.handleUpdateAvatar}
            />
            <ImagePopup
              card={this.state.selectedCard}
              isOpen={this.state.selectedCard === null ? "" : "popup_active"}
              onClose={this.closeAllPopup}
            />
          </div>
        </div>
      </currentUserContext.Provider>
    );
  }
}

export default withRouter(App);
