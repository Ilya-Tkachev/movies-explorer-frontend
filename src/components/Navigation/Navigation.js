import React from 'react';
import './Navigation.css'
import './Popup.css'
import { Link, useLocation } from 'react-router-dom';
import menuIconPath from '../../images/menu-icon.svg';
import { HOME, PROFILE, MOVIES, SAVED_MOVIES} from '../../utils/urlConstants'

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
                    <button className="popup__button-close object-hower" type="button" onClick={closeNavifationPopup} />
                    <Link to={HOME} className="header__links object-hower" onClick={closeNavifationPopup}>
                        <p className={`header__link ${underline(HOME)}`}>Главная</p>
                    </Link>
                    <Link to={MOVIES} className="header__links object-hower" onClick={closeNavifationPopup}>
                        <p className={`header__link ${underline(MOVIES)}`}>Фильмы</p>
                    </Link>
                    <Link to={SAVED_MOVIES} className="header__links object-hower" onClick={closeNavifationPopup}>
                        <p className={`header__link ${underline(SAVED_MOVIES)}`}>Сохраненные Фильмы</p>
                    </Link>
                    <Link to={PROFILE} className="header__cabinet header__links object-hower" onClick={closeNavifationPopup}>
                        <p className={`popup__link__link ${underline(PROFILE)}`}>Аккаунт</p>
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
                <Link to={MOVIES} className="header__links object-hower">
                    <p className={`header__link ${fatten(MOVIES)}`}>Фильмы</p>
                </Link>
                <Link to={SAVED_MOVIES} className="header__links object-hower">
                    <p className={`header__link ${fatten(SAVED_MOVIES)}`}>Сохраненные Фильмы</p>
                </Link>
                <Link to={PROFILE} className="header__cabinet header__links object-hower">
                    <p className={`header__link ${fatten(PROFILE)}`}>Аккаунт</p>
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