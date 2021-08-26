class MoviesApi {
    constructor(address) {
        this._address = address;
    }

    _status(response) {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    _json(response) {
        return response.json();
    }

    _error(error) {
        console.log(`Ошибка. Запрос не выполнен. ${error}`);
    }

    _restGet() {
        return fetch(this._address)
            .then(this._status)
            .then(this._json)
            .then(data => data)
            .catch(this._error);
    }

    getMovies() {
        return this._restGet();
    }

}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

export default moviesApi;