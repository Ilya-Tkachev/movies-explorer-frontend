import React from 'react';
import '../../index.css';
import './App.css';
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoute';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile'
import Movies from '../Movies/Movies'
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../404/NotFound'
import api from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Switch, Route, useHistory } from "react-router-dom";
import { HOME, LOGIN, REGISTER, PROFILE, MOVIES, SAVED_MOVIES} from '../../utils/urlConstants'

function App() {
  const [currentUser, setCurrentUser] = React.useState({name: 'Коталий', email: 'cat@gmail.com'});
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [registrationError, setRegistrationError] = React.useState(undefined);
  const [loginError, setLoginError] = React.useState(undefined);
  const history = useHistory();
  const TOKEN = 'token';

  React.useEffect(() => {
    console.log('App useEffect called');
    if (localStorage.getItem(TOKEN)) {
      api.validate()
        .then((response) => {
          setIsLoggedIn(true);
          setCurrentUser(response);
          history.push(HOME);
        })
        .catch(error => {
          console.error(error);
          handleLogout();
        });
    }
  }, []);

  function handleUpdateUser(email, name) {
    api.updateUserInfo(email, name)
      .then(response => setCurrentUser(response))
      .catch(err => console.log(err));
  }
  
  function handleMovieSave(name, url) {
    api.saveMovie(name, url)
      .then(response => setSavedMovies([response, ...savedMovies]))
      .catch(err => console.log(err));
  }
  
  function handleMovieDelete(movieToRemove) {
    api.deleteMovie(movieToRemove._id)
      .then(() => setSavedMovies(savedMovies.filter(movie => movie._id !== movieToRemove._id)))
      .catch(err => console.log(err));
  }
  
  function handleRegistration(email, password, name) {
    setRegistrationError(undefined);
    api.registretion(email, password, name)
      .then(() => {
        history.push(LOGIN);
      })
      .catch((error) => {
        console.error(error);
        setRegistrationError(error);
      });
  }

  function handleLogin(email, password) {
    setLoginError(undefined);
    api.authorization(email, password)
      .then(data => {
        localStorage.setItem(TOKEN, data.token);
        setIsLoggedIn(true);

        api.getUserInfo()
          .then(response => setCurrentUser(response))
          .catch(err => console.log(err));

        api.getSavedMoviesData()
          .then(initialCards => setSavedMovies(initialCards))
          .catch(err => console.log(err));

        history.push(SAVED_MOVIES);
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error);
      });
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN);
    setIsLoggedIn(false);
    setCurrentUser(undefined);
    setSavedMovies([]);
    history.push(HOME);
  }

  const cards = [
    {
        _id: 1,
        name: 'Время',
        link: 'https://www.kinopoisk.ru/film/517988/',
        imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
        isLiked: false,
        time: '1ч 53м'
    },
    {
        _id: 2,
        name: 'Время',
        link: 'https://www.kinopoisk.ru/film/517988/',
        imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
        isLiked: false,
        time: '1ч 53м'
    },
    {
        _id: 3,
        name: 'Время',
        link: 'https://www.kinopoisk.ru/film/517988/',
        imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
        isLiked: false,
        time: '1ч 53м'
    },
    {
        _id: 4,
        name: 'Время',
        link: 'https://www.kinopoisk.ru/film/517988/',
        imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
        isLiked: false,
        time: '1ч 53м'
    },
    {
        _id: 5,
        name: 'Время',
        link: 'https://www.kinopoisk.ru/film/517988/',
        imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
        isLiked: false,
        time: '1ч 53м'
    },
];

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>

          <Route exact path={REGISTER}>
            <Register
              onRegistration={handleRegistration} 
              registrationError={registrationError}
            />
          </Route>

          <Route exact path={LOGIN}>
            <Login 
              onLogin={handleLogin} 
              loginError={loginError}
            />
          </Route>

          <ProtectedRoute path={PROFILE} component={Profile} 
            currentUser={currentUser}
            onUserUpdate={handleUpdateUser}
            onLogout={handleLogout}
          />

          <ProtectedRoute path={MOVIES} component={Movies} 
            currentUser={currentUser}
            onMovieSave={(movieToSave) => handleMovieSave(movieToSave)}
          />

          <ProtectedRoute path={SAVED_MOVIES} component={Movies} 
            currentUser={currentUser}
            cards={cards}
            onMovieDeleted={(movieToSave) => handleMovieDelete(movieToSave)}
          />

          <Route exact path={HOME}>
            <Main />
          </Route>

          <Route component={NotFound} />

        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;