import React from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <div className="profile">
            <h1 className="profile__title">Привет, Витайлий</h1>
            <div className="profile__user-data">
                <div className="profile__user-data-name">
                    <p className="profile__text profile__text-weight-500">Имя</p>
                    <p className="profile__text profile__text-weight-400">Виталий</p>
                </div>
                <div className="profile__user-data-email">
                    <p className="profile__text profile__text-weight-500">E-mail</p>
                    <p className="profile__text profile__text-weight-400">pochta@yandex.ru</p>
                </div>
            </div>
            <button className="profile__button-edit object-hower">Редактировать</button>
            <Link to="/register" className="profile__link-logout object-hower">Выйти из аккаунта</Link>
        </div>
    );
}

export default Profile;