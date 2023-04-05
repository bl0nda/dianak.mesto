export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResult);
  }

  pushNewCard(obj) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.title,
        link: obj.link,
      }),
    }).then(this._getResult);
  }

  setProfileData(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        job,
      }),
    }).then(this._getResult);
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResult);
  }

  setNewAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        link
      }),
    }).then(this._getResult);
  }

  setLike() {
    return fetch(`${this._url}/cards/cardId/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._getResult);
  }
}
