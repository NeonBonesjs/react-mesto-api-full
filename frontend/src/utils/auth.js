class Auth {
  constructor(BASE_URL) {
    this.BASE_URL = BASE_URL;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register = (email, password) => {
    return fetch(`${this.BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._getResponseData(res));
  };

  authorize = (identifier, password) => {
    return fetch(`${this.BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: identifier,
      }),
    }).then((res) => this._getResponseData(res));
    // .then((data) => {
    //   if (data.user){
    //     localStorage.setItem('jwt', data.jwt);
    //     return data;
    //   }
    // })
  };

  getUserEmail = (jwt) => {
    return fetch(`${this.BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._getResponseData(res));
  };
}

const auth = new Auth("https://auth.nomoreparties.co");

export default auth;
