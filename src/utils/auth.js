class Auth {
  constructor(config) {
    this.url = config.url;
  }

  register (name, email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  authorize = (email, password) => {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  getContent = (token) => {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
}

const auth = new Auth({
  url: 'https://api.slacker.students.nomoredomains.monster',
})

export default auth;