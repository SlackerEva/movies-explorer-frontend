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

  editProfile(name, email) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  getMovies() {
    return fetch(`${this.url}/movies`, {
      headers: this.headers
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  addMovie(data) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailer: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  removeMovie(id) {
    return fetch(`${this.url}/movies/${id}`, {
      method: "DELETE",
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