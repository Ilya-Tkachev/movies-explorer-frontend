import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logoPath from '../../images/logo.svg';

function Header() {
    const location = useLocation();

    const render = () => {
        var headerHtml = undefined;
        if (location.pathname === '/') {
            headerHtml = (
                <header className="header header-main">
                    <Link to="/">
                        <img src={logoPath} alt="Изображение Лого" className="object-hower" />
                    </Link>
                    <div className="heder__flex-continer">
                        <Link to="/register" className="header__registration-text object-hower">Регистрация</Link>
                        <button className="header__login-button">
                            <Link to="/login" className="header__login-button-text object-hower">Войти</Link>
                        </button>
                    </div>
                </header>
            )
        } else if (location.pathname === '/profile' || location.pathname === '/movies' || location.pathname === '/savedMovies') {
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