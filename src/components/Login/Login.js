import React, { useState } from 'react';
import './Login.css'
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import inputValidator from '../../utils/inputValidator';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        onLogin(email, password);
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo object-hower" src={logoPath} alt="Изображение Лого" />
            </Link>
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <p className="login__input-title">E-mail</p>
                <input id="auth-login-input" className="login__input" placeholder="Почта" name="email" type="email" onChange={handleEmailChange} value={email} required minLength={2} maxLength={40} autoComplete="off" />
                <span className="form__input-error" id="auth-login-input-error"></span>

                <p className="login__input-title">Пароль</p>
                <input id="auth-password-input" className="login__input" placeholder="Password" name="password" type="password" onChange={handlePasswordChange} value={password} required minLength={2} maxLength={40} autoComplete="off" />
                <span className="form__input-error" id="auth-password-input-error"></span>

                <button className="login__button object-hower" type="submit">Войти</button>
            </form>
            <p className="login__text" href="">
                Еще не зарегистрированы? &ensp;
                <Link to="/register" className="login__link object-hower">Регистрация</Link>
            </p>
        </div>
    );
}

export default Login;