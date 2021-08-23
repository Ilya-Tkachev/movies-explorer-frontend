import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logoPath from '../../images/logo.svg';
import { HOME, PROFILE, MOVIES, SAVED_MOVIES} from '../../utils/urlConstants'

function Header() {
    const location = useLocation();

    const render = () => {
        var headerHtml = undefined;
        if (location.pathname === HOME) {
            headerHtml = (
                <header className="header header-main">
                    <Link to="/">
                        <img src={logoPath} alt="Изображение Лого" className="object-hower" />
                    </Link>
                    <div className="heder__flex-continer-promo">
                        <Link to="/register" className="header__registration-text object-hower">Регистрация</Link>
                        <button className="header__login-button object-hower">
                            <Link to="/login" className="header__login-button-text">Войти</Link>
                        </button>
                    </div>
                </header>
            )
        } else if (location.pathname === PROFILE || location.pathname === MOVIES || location.pathname === SAVED_MOVIES) {
            headerHtml = (
                <header className="header">
                    <Link to="/">
                        <img src={logoPath} alt="Изображение Лого" className="object-hower"/>
                    </Link>
                    <Navigation />
                </header>
            )
        } else {
            headerHtml = (
                <div className="header__empty" />
            )
        }
        return headerHtml;
    }

    return render();
}

export default Header;