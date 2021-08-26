import React from 'react';
import './Login.css'
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import inputValidator from '../../utils/inputValidator';

function Login({ onLogin, loginError }) {
    const [emailInput, setEmailInput] = React.useState({ value: '', valid: false });
    const [passwordInput, setPasswordInput] = React.useState({ value: '', valid: false });
    const buttonDisabled = " login__button-disabled";
    var isFormValid = (emailInput.valid && passwordInput.valid);

    function handleEmailChange(event) {
        event.preventDefault();
        setEmailInput({
            value: event.target.value,
            valid: inputValidator.validate(event.target)
        });
    }

    function handlePasswordChange(event) {
        event.preventDefault();
        setPasswordInput({
            value: event.target.value,
            valid: inputValidator.validate(event.target)
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        onLogin(emailInput.value, passwordInput.value);
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo object-hower" src={logoPath} alt="Изображение Лого" />
            </Link>
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <p className="login__input-title">E-mail</p>
                <input id="auth-login-input" className="login__input" placeholder="Почта" name="email" type="email" onChange={handleEmailChange} value={emailInput.value} required minLength={2} maxLength={40} autoComplete="off" />
                <span className="form__input-error" id="auth-login-input-error"></span>

                <p className="login__input-title">Пароль</p>
                <input id="auth-password-input" className="login__input" placeholder="Password" name="password" type="password" onChange={handlePasswordChange} value={passwordInput.value} required minLength={2} maxLength={40} autoComplete="off" />
                <span className="form__input-error" id="auth-password-input-error"></span>

                <button className={`login__button object-hower ${isFormValid ? '' : buttonDisabled}`} disabled={!isFormValid} type="submit">Войти</button>
            </form>
            <p className="login__text" href="">
                Еще не зарегистрированы? &ensp;
                <Link to="/register" className="login__link object-hower">Регистрация</Link>
            </p>
            <p className={`login__text login__error-text ${loginError ? 'visible' : 'invisible'}`}>
                {loginError}
            </p>
        </div>
    );
}

export default Login;