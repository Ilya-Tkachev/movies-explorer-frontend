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
  const [email, setEmail] = React.useState('example@yandex.ru');
  const history = useHistory();

  React.useEffect(() => {
    /*
    api.getUserInfo()
      .then(response => setCurrentUser(response))
      .catch(err => console.log(err));

    const jwt = localStorage.getItem('token');
    if (jwt) {
      api.validate(jwt)
        .then((responce) => {
          setEmail(responce.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch(error => {
          console.error(error);
          handleLogout();
        });
    }
    */
  }, []);

  function closeAllPopups() {

  }

  function handleRegistration(email, password) {
    /*
    api.registretion(email, password)
      .then(() => {
        setIsSuccessRegistrationIconOpen(true);
      })
      .catch((error) => {
        console.error(error);
        setIsFailedRegistrationIconOpen(true);
        history.push("/register");
      });
      */
  }

  function handleLogin(email, password) {
    /*
    api.authorization(email, password)
      .then(data => {
        localStorage.setItem('token', data.token);
        setEmail(email);
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch(error => console.error(error));
      */
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setEmail('');
    history.push("/login");
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
              onClose={closeAllPopups}
              onRegistration={handleRegistration}
            />
          </Route>

          <Route exact path={LOGIN}>
            <Login onLogin={handleLogin} tokenCheck={() => { }} />
          </Route>


          <ProtectedRoute path={PROFILE} component={Profile} 
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />

          <ProtectedRoute path={MOVIES} component={Movies} 
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            cards={cards}
          />

          <ProtectedRoute path={SAVED_MOVIES} component={Movies} 
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            cards={cards}
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