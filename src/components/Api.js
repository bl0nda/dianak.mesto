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
      headers: this._headers
  })
  .then(this._getResult)
  }

  pushNewCard(obj) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        link: obj.link
      })
    })
    .then(this._getResult);
  }

  setProfileData(data) {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then(this._getResult);
  }

  getProfileData() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResult);
  }


}
