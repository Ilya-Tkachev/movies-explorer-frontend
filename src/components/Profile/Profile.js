import React from 'react';
import './Profile.css'

function Profile({currentUser}) {
    return (
        <div className="profile">
            <h1 className="profile__title">Привет, {currentUser.name}</h1>
            <div className="profile__user-data">
                <div className="profile__user-data-name">
                    <p className="profile__text profile__text-weight-500">Имя</p>
                    <p className="profile__text profile__text-weight-400">{currentUser.name}</p>
                </div>
                <div className="profile__user-data-email">
                    <p className="profile__text profile__text-weight-500">E-mail</p>
                    <p className="profile__text profile__text-weight-400">{currentUser.email}</p>
                </div>
            </div>
            <button className="profile__button-edit object-hower">Редактировать</button>
            <button className="profile__button-logout object-hower">Выйти из аккаунта</button>
        </div>
    );
}

export default Profile;