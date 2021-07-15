class MoviesApi {
  constructor(config) {
    this._url = config.url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return  Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getMovies() {
    return fetch(`${this._url}`)
    .then((res) => {
      return this._getResponseData(res);
    });
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies'
});

export default moviesApi;