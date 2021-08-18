import React from 'react';
import './Navigation.css'
import './Popup.css'
import { Link, useLocation } from 'react-router-dom';
import menuIconPath from '../../images/menu-icon.svg';

function Navigation() {
    const [isNavigationPopupOpened, setIsNavigationPopupOpened] = React.useState(false);
    const location = useLocation();

    function openNavifationPopup() {
        setIsNavigationPopupOpened(true);
    }

    function closeNavifationPopup() {
        setIsNavigationPopupOpened(false);
    }

    function underline(url) {
        if (location.pathname === url) {
            return " header__link-underlined"
        } else {
            return ""
        }
    }

    function fatten(url) {
        if (location.pathname === url) {
            return " header__link-fatten"
        } else {
            return ""
        }
    }

    const navigationMenu = () => {
        return (
            <div className={`popup ${(isNavigationPopupOpened ? 'popup_state_opened' : '')}`}>
                <div className="popup__container">
                    <button className="popup__button-close" type="button" onClick={closeNavifationPopup} />
                    <Link to="/" className="header__links object-hower" onClick={closeNavifationPopup}>
                        <p className={`header__link ${underline('/')}`}>Главная</p>
                    </Link>
                    <Link to="/movies" className="header__links object-hower" onClick={closeNavifationPopup}>
                        <p className={`header__link ${underline('/movies')}`}>Фильмы</p>
                    </Link>
                    <Link to="/savedMovies" className="header__links object-hower" onClick={closeNavifationPopup}>
                        <p className={`header__link ${underline('/savedMovies')}`}>Сохраненные Фильмы</p>
                    </Link>
                    <Link to="/profile" className="header__cabinet header__links object-hower" onClick={closeNavifationPopup}>
                        <p className={`popup__link__link ${underline('/profile')}`}>Аккаунт</p>
                        <div className="header__cabinet-icon">
                            <div className="header__cabinet-icon1"></div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <>
            <div className="heder__flex-continer">
                <Link to="/movies" className="header__links object-hower">
                    <p className={`header__link ${fatten('/movies')}`}>Фильмы</p>
                </Link>
                <Link to="/savedMovies" className="header__links object-hower">
                    <p className={`header__link ${fatten('/savedMovies')}`}>Сохраненные Фильмы</p>
                </Link>
                <Link to="/profile" className="header__cabinet header__links object-hower">
                    <p className={`header__link ${fatten('/profile')}`}>Аккаунт</p>
                    <div className="header__cabinet-icon">
                        <div className="header__cabinet-icon1"></div>
                    </div>
                </Link>
            </div>
            <button className="header__menu object-hower" type="button" onClick={openNavifationPopup}>
                <img src={menuIconPath} alt="кнопка редактирования" />
            </button>
            {navigationMenu()}
        </>
    );
}

export default Navigation;