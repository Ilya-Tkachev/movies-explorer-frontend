import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoPath from '../../images/logo.svg';

function Header() {
    const location = useLocation();

    const render = () => {
        var headerHtml = undefined;
        if (location.pathname === '/') {
            headerHtml = (
                <header className="header header-main">
                    <Link to="/">
                        <img src={logoPath} alt="Изображение Лого" />
                    </Link>
                    <div className="heder__flex-continer">
                        <Link to="/register" className="header__registration-text">Регистрация</Link>
                        <button className="header__login-button">
                            <Link to="/login" className="header__login-button-text">Войти</Link>
                        </button>
                    </div>
                </header>
            )
        } else if (location.pathname === '/profile' || location.pathname === '/movies' || location.pathname === '/savedMovies') {
            headerHtml = (
                <header className="header">
                    <Link to="/">
                        <img src={logoPath} alt="Изображение Лого" />
                    </Link>
                    <div className="heder__flex-continer">
                        <Link to="/movies" className="header__links">
                            <p className="header__link header__link-weight-500">Фильмы</p>
                        </Link>
                        <Link to="/savedMovies" className="header__links">
                            <p className="header__link header__link-weight-400">Сохраненные Фильмы</p>
                        </Link>
                        <Link to="/profile" className="header__cabinet header__links">
                            <p className="header__link header__link-weight-500">Аккаунт</p>
                            <div className="header__cabinet-icon">
                                <div className="header__cabinet-icon1"></div>
                            </div>
                        </Link>
                    </div>
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