import React, { useState } from 'react';
import './Login.css'
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onLogin(email, password);
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src={logoPath} alt="Изображение Лого" />
            </Link>
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <p className="login__input-title">E-mail</p>
                <input className="login__input" placeholder="Почта" type="email" onChange={handleEmailChange} value={email} required />
                <p className="login__input-title">Пароль</p>
                <input className="login__input" placeholder="Password" type="password" onChange={handlePasswordChange} value={password} required />
                <button className="login__button" type="submit">Войти</button>
            </form>
            <p className="login__text" href="">
                Еще не зарегистрированы? &ensp;
                <Link to="/register" className="login__link">Регистрация</Link>
            </p>
        </div>
    );
}

export default Login;