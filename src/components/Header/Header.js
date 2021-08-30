import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logoPath from '../../images/logo.svg';
import { LOGIN, REGISTER } from '../../utils/Constants'

function Header({ isLoggedIn }) {
    const location = useLocation();

    const render = () => {
        if (location.pathname === LOGIN || location.pathname === REGISTER) {
            return (<div className="header__empty" />)
        }
        if (isLoggedIn) {
            return (
                <header className="header">
                    <Link to="/">
                        <img src={logoPath} alt="Изображение Лого" className="object-hower" />
                    </Link>
                    <Navigation />
                </header>
            )
        } else {
            return (
                <header className="header header-main">
                    <Link to="/">
                        <img src={logoPath} alt="Изображение Лого" className="object-hower" />
                    </Link>
                    <div className="heder__flex-continer-promo">
                        <Link to="/register" className="header__registration-text object-hower">Регистрация</Link>
                        <Link to="/login" className="header__login-button-text">
                            <button className="header__login-button object-hower">Войти</button>
                        </Link>
                    </div>
                </header>
            )
        }
    }

    return render();
}

export default Header;