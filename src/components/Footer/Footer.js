import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';
import { HOME, MOVIES, SAVED_MOVIES} from '../../utils/Constants'

function Footer() {
    const location = useLocation();

    const render = () => {
        var footerHtml = undefined
        if (location.pathname === HOME || location.pathname === MOVIES || location.pathname === SAVED_MOVIES) {
            footerHtml =
                <div className="footer">
                    <p className="footer__subheadline">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                    <div className="footer__two-columns">
                        <p className="footer__year">© 2020</p>
                        <li className="footer__social-links">
                            <ul className="footer__social-links-item"><a className="footer__social-link object-hower" href="https://praktikum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></ul>
                            <ul className="footer__social-links-item"><a className="footer__social-link object-hower" href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a></ul>
                            <ul className="footer__social-links-item"><a className="footer__social-link object-hower" href="https://ru-ru.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></ul>
                        </li>
                    </div>
                </div>;
        } else {
            footerHtml = <div className="footer__empty"/>;
        }
        return footerHtml;
    }

    return render();
}

export default Footer;