export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
      this._name = document.querySelector(nameSelector);
      this._job = document.querySelector(jobSelector);
      this._pic = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._job.textContent,
      };
    }
  
    setUserInfo( {name, about} ) {
      this._name.textContent = name;
      this._job.textContent = about;
    }

    setAvatar(link) {
      this._pic.src = link;
    }

    setUserId(_id) {
      this._userId = _id
    }
  
    getUserId() {
      return this._userId;
    }
  }