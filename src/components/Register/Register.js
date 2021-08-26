import React from 'react';
import './Register.css'
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import inputValidator from '../../utils/inputValidator';

function Register({ onRegistration, registrationError }) {
    const [userNameInput, setUserNameInput] = React.useState({ value: '', valid: false });
    const [emailInput, setEmailInput] = React.useState({ value: '', valid: false });
    const [passwordInput, setPasswordInput] = React.useState({ value: '', valid: false });
    const buttonDisabled = " registration__button-disabled";
    var isFormValid = (userNameInput.valid && emailInput.valid && passwordInput.valid);

    function handleUserNameChange(event) {
        event.preventDefault();
        setUserNameInput({
            value: event.target.value,
            valid: inputValidator.validate(event.target)
        });
    }

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
        onRegistration(emailInput.value, passwordInput.value, userNameInput.value);
    }

    return (
        <div className="registration">
            <Link to="/">
                <img className="registration__logo object-hower" src={logoPath} alt="Изображение Лого" />
            </Link>
            <h2 className="registration__title">Добро пожаловать!</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
                <p className="registration__input-title">Имя</p>
                <input id="registration-name-input" className="registration__input" placeholder="Name" name="name" type="text" onChange={handleUserNameChange} value={userNameInput.value} required minLength={2} maxLength={50} autoComplete="off" 
                    pattern="^[a-zA-ZА-Яа-яЁё\s]+$"/>
                <span className="form__input-error" id="registration-name-input-error" />

                <p className="registration__input-title">E-mail</p>
                <input id="registration-email-input" className="registration__input" placeholder="Почта" name="email" type="email" onChange={handleEmailChange} value={emailInput.value} required minLength={2} maxLength={40} autoComplete="off" />
                <span className="form__input-error" id="registration-email-input-error" />

                <p className="registration__input-title">Пароль</p>
                <input id="registration-password-input" className="registration__input" placeholder="Password" name="password" type="password" onChange={handlePasswordChange} value={passwordInput.value} required minLength={2} maxLength={40} autoComplete="off" />
                <span className="form__input-error" id="registration-password-input-error" />

                <button className={`registration__button object-hower ${isFormValid ? '' : buttonDisabled}`} disabled={!isFormValid} type="submit">Зарегистрироваться</button>
            </form>
            <p className="registration__text">
                Уже зарегистрированы? &ensp;
                <Link to="/login" className="registration__link object-hower">Войти</Link>
            </p>
            <p className={`registration__text registration__error-text ${registrationError ? 'visible' : 'invisible'}`}>
                {registrationError}
            </p>
        </div>
    );
}

export default Register;