import React from 'react';
import './Register.css'
import logoPath from '../../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Register({ isSuccessRegistrationIconOpen, isFailedRegistrationIconOpen, onClose, onRegistration }) {
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onRegistration(email, password);
    }

    function closeAndRedirect() {
        onClose();
        history.push("/login");
    }

    return (
        <div className="registration">
            <Link to="/">
                <img className="registration__logo" src={logoPath} alt="Изображение Лого" />
            </Link>
            <h2 className="registration__title">Добро пожаловать!</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
                <p className="registration__input-title">Имя</p>
                <input className="registration__input" placeholder="Name" type="string" onChange={handleUserNameChange} value={userName} required />
                <p className="registration__input-title">E-mail</p>
                <input className="registration__input" placeholder="Почта" type="email" onChange={handleEmailChange} value={email} required />
                <p className="registration__input-title">Пароль</p>
                <input className="registration__input" placeholder="Password" type="password" onChange={handlePasswordChange} value={password} required />
                <button className="registration__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="registration__text" href="">
                Уже зарегистрированы? &ensp;
                <Link to="/login" className="registration__link">Войти</Link>
            </p>
        </div>
    );
}

export default Register;