export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
      this._name = document.querySelector(nameSelector);
      this._job = document.querySelector(jobSelector);
      this._pic = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
      return {
        name: this._name.textContent,
        job: this._job.textContent,
      };
    }
  
    setUserInfo( name, job ) {
      this._name.textContent = name;
      this._job.textContent = job;
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