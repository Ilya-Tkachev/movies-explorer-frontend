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
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { HOME, LOGIN, REGISTER, PROFILE, MOVIES, SAVED_MOVIES, MOVIE_POSTER, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_ERROR, SUCCESS_MESSAGE } from '../../utils/Constants'

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(undefined);
  const [savedMovies, setSavedMovies] = React.useState(undefined);
  const [allMovies, setAllMovies] = React.useState(undefined);
  const history = useHistory();
  const TOKEN = 'token';
  const location = useLocation();

  React.useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      mainApi.validate()
        .then((response) => {
          setCurrentUser(response);
          setIsLoggedIn(true);
          history.push((location.pathname === LOGIN || location.pathname === REGISTER) ? HOME : location.pathname);
        })
        .catch((error) => {
          console.error(error);
          handleLogout();
        });
    }
  }, []);

  function handleUpdateUser(email, name, onUserUpdate, setLoading) {
    mainApi.updateUserInfo(email, name)
      .then((response) => {
        setCurrentUser(response);
        onUserUpdate({ type: PROFILE_UPDATE_SUCCESS, message: SUCCESS_MESSAGE });
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        onUserUpdate({ type: PROFILE_UPDATE_ERROR, message: error.message });
        setLoading(false);
      });
  }

  function handleMovieSave(movieToSave) {
    mainApi.saveMovie(movieToSave)
      .then(response => setSavedMovies([response, ...savedMovies]))
      .catch(err => console.error(err));
  }

  function handleMovieDelete(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => setSavedMovies(savedMovies.filter(movie => movie._id !== movieId)))
      .catch(err => console.error(err));
  }

  function handleRegistration(email, password, name, setError, setLoading) {
    handleLogout();
    mainApi.registretion(email, password, name)
      .then(() => handleLogin(email, password, setLoading))
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }

  function handleLogin(email, password, setError, setLoading) {
    mainApi.authorization(email, password)
      .then(data => {
        localStorage.setItem(TOKEN, data.token);
        setIsLoggedIn(true);

        mainApi.getUserInfo()
          .then((response) => { setCurrentUser(response); })
          .catch(err => console.error(err));

        setLoading(false);
        history.push(MOVIES);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN);
    setIsLoggedIn(false);
    setCurrentUser(undefined);
    setAllMovies([]);
    setSavedMovies([]);
    history.push(HOME);
  }

  function onLoadMovies(setError) {
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
        });
        setAllMovies(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }

  function onLoadSavedMovies(setError) {
    mainApi.getSavedMoviesData()
      .then(data => setSavedMovies(data))
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }

  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} />
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>

          <Route path={REGISTER}>
            <Register
              onRegistration={handleRegistration}
            />
          </Route>

          <Route path={LOGIN}>
            <Login
              onLogin={handleLogin}
            />
          </Route>

          <ProtectedRoute path={PROFILE} component={Profile} isLoggedIn={isLoggedIn}
            onUserUpdate={handleUpdateUser}
            onLogout={handleLogout}
          />

          <ProtectedRoute path={MOVIES} component={Movies} isLoggedIn={isLoggedIn}
            onMovieSave={(movie) => handleMovieSave(movie)}
            onMovieDelete={(movieId) => handleMovieDelete(movieId)}
            onLoadMovies={onLoadMovies}
            onLoadSavedMovies={onLoadSavedMovies}
            allMovies={allMovies}
            savedMovies={savedMovies}
          />

          <ProtectedRoute path={SAVED_MOVIES} component={Movies} isLoggedIn={isLoggedIn}
            onMovieDelete={(movieId) => handleMovieDelete(movieId)}
            onLoadMovies={onLoadMovies}
            onLoadSavedMovies={onLoadSavedMovies}
            allMovies={allMovies}
            savedMovies={savedMovies}
          />

          <Route path={HOME} component={Main} />

          <Route component={NotFound} />

        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;