import React from 'react';
import './Register.css'
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import inputValidator from '../../utils/inputValidator';

function Register({ onRegistration }) {
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleUserNameChange(event) {
        event.preventDefault();
        inputValidator.validate(event.target);
        setUserName(event.target.value);
    }

    function handleEmailChange(event) {
        event.preventDefault();
        inputValidator.validate(event.target);
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        event.preventDefault();
        inputValidator.validate(event.target);
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onRegistration(email, password);
    }

    return (
        <div className="registration">
            <Link to="/">
                <img className="registration__logo object-hower" src={logoPath} alt="Изображение Лого" />
            </Link>
            <h2 className="registration__title">Добро пожаловать!</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
                <p className="registration__input-title">Имя</p>
                <input id="registration-name-input" className="registration__input" placeholder="Name" name="name" type="text" onChange={handleUserNameChange} value={userName} required minLength={2} maxLength={50} autoComplete="off"/>
                <span className="form__input-error" id="registration-name-input-error" />

                <p className="registration__input-title">E-mail</p>
                <input id="registration-email-input" className="registration__input" placeholder="Почта" name="email" type="email" onChange={handleEmailChange} value={email} required minLength={2} maxLength={40} autoComplete="off"/>
                <span className="form__input-error" id="registration-email-input-error" />

                <p className="registration__input-title">Пароль</p>
                <input id="registration-password-input" className="registration__input" placeholder="Password" name="password" type="password" onChange={handlePasswordChange} value={password} required minLength={2} maxLength={40} autoComplete="off"/>
                <span className="form__input-error" id="registration-password-input-error" />
                
                <button className="registration__button object-hower" type="submit">Зарегистрироваться</button>
            </form>
            <p className="registration__text">
                Уже зарегистрированы? &ensp;
                <Link to="/login" className="registration__link object-hower">Войти</Link>
            </p>
        </div>
    );
}

export default Register;