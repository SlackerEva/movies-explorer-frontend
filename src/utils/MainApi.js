class MainApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return  Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getProfile() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }
}

const apiMain = new MainApi({
  url: 'https://api.slacker.students.nomoredomains.monster',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export default apiMain;