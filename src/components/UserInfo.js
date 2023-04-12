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
        avatar: this._pic.src
      };
    }
  
    setUserInfo( {name, about, avatar} ) {
      this._name.textContent = name;
      this._job.textContent = about;
      this._pic.src = avatar;
    }

    setUserId(_id) {
      this._userId = _id;
    }
  
    getUserId() {
      return this._userId;
    }
  }