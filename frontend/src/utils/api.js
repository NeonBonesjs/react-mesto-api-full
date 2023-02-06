class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  };

  getInitialCard = () => {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  };

  editUserInfo = (data) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._getResponseData(res));
  };

  addNewCard = (data) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponseData(res));
  };

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  putLike = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  };

  deleteLike = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  };

  changeLikeCardStatus = (cardId, isLiked) => {
    return isLiked ? this.deleteLike(cardId) : this.putLike(cardId);
  };

  editAvatar = (data) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  };
}

const api = new Api({
  baseUrl: "http://localhost:3000/api",
  token: "2f4f6221-2bd1-4593-b371-8424249e75f7",
});

export default api;
