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
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Switch, Route, useHistory } from "react-router-dom";
import { HOME, LOGIN, REGISTER, PROFILE, MOVIES, SAVED_MOVIES, MOVIE_POSTER } from '../../utils/urlConstants'

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [registrationError, setRegistrationError] = React.useState(undefined);
  const [loginError, setLoginError] = React.useState(undefined);
  const [userUpdateError, setUserUpdateError] = React.useState(undefined);
  const history = useHistory();
  const TOKEN = 'token';

  React.useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      mainApi.validate()
        .then((response) => {
          setCurrentUser(response);
          setIsLoggedIn(true);
          history.push(MOVIES);
        })
        .catch(error => {
          console.error(error);
          handleLogout();
        });
    }
  }, []);

  function handleUpdateUser(email, name) {
    setUserUpdateError(undefined);
    mainApi.updateUserInfo(email, name)
      .then((response) => {
        setCurrentUser(response);
      })
      .catch(error => {
        console.error(error);
        setUserUpdateError(error.message);
      });
  }

  function handleMovieSave(movieToSave) {
    mainApi.saveMovie(movieToSave)
      .then(response => setSavedMovies([response, ...savedMovies]))
      .catch(err => console.error(err));
  }

  function handleMovieDelete(movieToRemove) {
    mainApi.deleteMovie(movieToRemove._id)
      .then(() => setSavedMovies(savedMovies.filter(movie => movie._id !== movieToRemove._id)))
      .catch(err => console.error(err));
  }

  function handleRegistration(email, password, name) {
    setRegistrationError(undefined);
    handleLogout();
    mainApi.registretion(email, password, name)
      .then(() => handleLogin(email, password))
      .catch((error) => {
        console.error(error);
        setRegistrationError(error.message);
      });
  }

  function handleLogin(email, password) {
    setLoginError(undefined);
    mainApi.authorization(email, password)
      .then(data => {
        localStorage.setItem(TOKEN, data.token);
        setIsLoggedIn(true);

        mainApi.getUserInfo()
          .then((response) => { setCurrentUser(response); })
          .catch(err => console.error(err));

        history.push(MOVIES);
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      });
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN);
    setIsLoggedIn(false);
    setCurrentUser(undefined);
    setRegistrationError(undefined);
    setLoginError(undefined);
    setUserUpdateError(undefined);
    setAllMovies([]);
    setSavedMovies([]);
    history.push(HOME);
  }

  function onLoadMovies() {
    moviesApi.getMovies()
      .then(data => {
        data.forEach(movie => {
          //We don't store in our DB all image info, only URLs so need to repack a little.
          movie.image = MOVIE_POSTER + movie.image.url;
          movie.thumbnail = MOVIE_POSTER + (movie.image?.formats?.thumbnail?.url ?? movie.image.url);
          //Store original external id
          movie.movieId = movie.id;
          movie.id = undefined;
          movie.created_at = undefined;
          movie.updated_at = undefined;
          //movie.trailer = movie.trailerLink;
        });
        setAllMovies(data);
      })
      .catch(error => console.error(error));
  }

  function onLoadSavedMovies() {
    mainApi.getSavedMoviesData()
      .then(data => setSavedMovies(data))
      .catch(error => console.error(error));
  }

  return (
    <div className="page">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>

          <Route exact path={HOME} component={Main} />

          <Route path={REGISTER}>
            <Register
              onRegistration={handleRegistration}
              registrationError={registrationError}
            />
          </Route>

          <Route path={LOGIN}>
            <Login
              onLogin={handleLogin}
              loginError={loginError}
            />
          </Route>

          <ProtectedRoute path={PROFILE} component={Profile} isLoggedIn={isLoggedIn}
            onUserUpdate={handleUpdateUser}
            onLogout={handleLogout}
            userUpdateError={userUpdateError}
          />

          <ProtectedRoute path={MOVIES} component={Movies} isLoggedIn={isLoggedIn}
            onMovieSave={(movie) => handleMovieSave(movie)}
            onMovieDelete={(movie) => handleMovieDelete(movie)}
            onLoadMovies={onLoadMovies}
            onLoadSavedMovies={onLoadSavedMovies}
            allMovies={allMovies}
            savedMovies={savedMovies}
          />

          <ProtectedRoute path={SAVED_MOVIES} component={Movies} isLoggedIn={isLoggedIn}
            onMovieDelete={(movie) => handleMovieDelete(movie)}
            onLoadMovies={onLoadMovies}
            onLoadSavedMovies={onLoadSavedMovies}
            allMovies={allMovies}
            savedMovies={savedMovies}
          />

          <Route component={NotFound} />

        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;