class MainApi {
    constructor(address) {
        this._address = address;
        this._userPath = 'users/me';
        this._moviesPath = 'movies';
        this._likesPath = 'likes';
        this._token = 'token';
    }

    _status(response) {
        if (response.status === 200 || response.status === 201 || response.status === 202 || response.status === 204) {
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

    _getHeaders() {
        return {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(this._token)}`
            }
        };
    }

    _restGet(endpoint) {
        return fetch(`${this._address}/${endpoint}`, this._getHeaders())
            .then(this._status)
            .then(this._json)
            .then(data => data);
    }

    _patchHeaders(body) {
        return {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(this._token)}`,
                'Content-Type': 'application/json'
            },
            body: body
        };
    }

    _restPatch(endpoint, body) {
        return fetch(`${this._address}/${endpoint}`, this._patchHeaders(body))
            .then(this._status)
            .then(this._json)
            .then(data => data);
    }

    getUserInfo() {
        return this._restGet(this._userPath);
    }

    updateUserInfo(email, name) {
        const body = JSON.stringify({ email, name })
        return this._restPatch(this._userPath, body);
    }

    getSavedMoviesData() {
        return this._restGet(this._moviesPath);
    }

    _postHeaders(body) {
        return {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(this._token)}`,
                'Content-Type': 'application/json'
            },
            body: body
        };
    }

    _restPost(endpoint, body) {
        return fetch(`${this._address}/${endpoint}`, this._postHeaders(body))
            .then(this._status)
            .then(this._json)
            .then(data => data);
    }

    saveMovie(movie) {
        const body = JSON.stringify(movie)
        return this._restPost(this._moviesPath, body);
    }

    _deleteHeaders() {
        return {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(this._token)}`
            }
        };
    }

    _restDelete(endpoint, id) {
        return fetch(`${this._address}/${endpoint}/${id}`, this._deleteHeaders())
            .then(this._status)
            .then(this._json)
            .then(data => data)
            .catch(this._error);
    }

    _putHeaders() {
        return {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(this._token)}`,
                'Content-Type': 'application/json'
            }
        };
    }

    _restPut(endpoint, id) {
        return fetch(`${this._address}/${endpoint}/${id}`, this._putHeaders())
            .then(this._status)
            .then(this._json)
            .then(data => data);
    }

    deleteMovie(movieId) {
        return this._restDelete(`${this._moviesPath}`, movieId);
    }

    authorization(email, password) {
        const headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }
        return fetch(`${this._address}/signin`, headers)
            .then(this._status)
            .then(this._json)
            .then(data => data);
    }

    registretion(email, password, name) {
        const headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        }
        return fetch(`${this._address}/signup`, headers)
            .then(this._status)
            .then(this._json)
            .then(data => data);
    }

    validate() {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(this._token)}`,
            }
        }
        return fetch(`${this._address}/${this._userPath}`, headers)
            .then(this._status)
            .then(this._json)
            .then(data => data);
    }
}

const mainApi = new MainApi(/*`${window.location.protocol}//api.ilya.diplom.nomoredomains.club`*/ 'http://localhost:3000');

export default mainApi;