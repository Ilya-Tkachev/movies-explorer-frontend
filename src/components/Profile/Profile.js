import React from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <div className="profile">
            <h1 className="profile__title">Привет, Витайлий</h1>
            <div className="profile__user-data">
                <div className="profile__user-data-name">
                    <p className="profile__text">Имя</p>
                    <p className="profile__text">Виталий</p>
                </div>
                <div className="profile__user-data-email">
                    <p className="profile__text">E-mail</p>
                    <p className="profile__text">pochta@yandex.ru</p>
                </div>
            </div>
            <button className="profile__button-edit">Редактировать</button>
            <Link to="/register" className="profile__link-logout">Выйти из аккаунта</Link>
        </div>
    );
}

export default Profile;