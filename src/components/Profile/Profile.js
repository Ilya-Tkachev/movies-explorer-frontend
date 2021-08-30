import React from 'react';
import './Profile.css'
import inputValidator from '../../utils/inputValidator';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { PROFILE_UPDATE_SUCCESS } from '../../utils/Constants';

function Profile({ onUserUpdate, onLogout }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [loading, setLoading] = React.useState(false);
    const [edditResponce, setEdditResponce] = React.useState({ type: undefined, message: undefined });
    const [userNameInput, setUserNameInput] = React.useState({ value: 'Loading...', valid: false });
    const [emailInput, setEmailInput] = React.useState({ value: 'Loading...', valid: false });
    const [edditMode, setEdditMode] = React.useState(false);

    React.useEffect(() => {
        setUserNameInput({ value: currentUser?.name ?? '', valid: true });
        setEmailInput({ value: currentUser?.email ?? '', valid: true });
    }, [currentUser])

    const buttonDisabled = " profile__button-disabled";
    var isFormValid = (userNameInput.valid && emailInput.valid);
    var visibleInEdditMode = edditMode ? 'visible' : 'invisible';
    var invisibleInEdditMode = edditMode ? 'invisible' : 'visible';

    function handleNameChange(event) {
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
            valid: inputValidator.validate(event.target) // тут нужен кастомный валидатор
        });
    }

    function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();
        //Не проверяю на изменения в формах т.к. нету кнопки отменить редактирование и сохранить пользователя неизмененным единственный способ закрыть режим редактирования
        if (currentUser.name !== userNameInput.value || currentUser.email !== emailInput.value) {
            onUserUpdate(emailInput.value, userNameInput.value, setEdditResponce, setLoading);
        }
        toggleEdditMode();
    }

    function toggleEdditMode() {
        if (!edditMode && edditResponce.message) edditResponce.message = undefined;
        setEdditMode(!edditMode);
    }

    return (
        <div className="profile">
            <h1 className="profile__title">Привет, {currentUser?.name?.split(' ')[0] ?? 'Loading...'}</h1>
            <div className="profile__user-data">
                <div className="profile__user-data-name">
                    <p className="profile__text profile__text-weight-500">Имя</p>
                    <p className={`profile__text profile__text-weight-400 ${invisibleInEdditMode}`}>{userNameInput.value}</p>
                    <div className={`profile-input-section ${visibleInEdditMode}`}>
                        <input id="profile-name-input" className="profile-input" placeholder="Имя" name="name" type="text" onChange={handleNameChange} value={userNameInput.value} required minLength={2} maxLength={40} autoComplete="off" disabled={loading} />
                        <span className="form__input-error" id="profile-name-input-error"></span>
                    </div>
                </div>
                <div className="profile__user-data-email">
                    <p className="profile__text profile__text-weight-500">E-mail</p>
                    <p className={`profile__text profile__text-weight-400 ${invisibleInEdditMode}`}>{emailInput.value}</p>
                    <div className={`profile-input-section ${visibleInEdditMode}`}>
                        <input id="profile-login-input" className="profile-input" placeholder="Почта" name="email" type="email" onChange={handleEmailChange} value={emailInput.value} required minLength={2} maxLength={40} autoComplete="off" disabled={loading} />
                        <span className="form__input-error" id="profile-login-input-error"></span>
                    </div>
                </div>
            </div>
            {edditResponce.message && <p className={`${edditResponce.type === PROFILE_UPDATE_SUCCESS ? 'profile__sucess-text' : 'profile__error-text'}`}>{edditResponce.message}</p>}
            <button className={`profile__button-edit object-hower   ${invisibleInEdditMode}`} onClick={toggleEdditMode}>Редактировать</button>
            <button className={`profile__button-logout object-hower ${invisibleInEdditMode}`} onClick={onLogout}>Выйти из аккаунта</button>
            <button className={`profile__button-save object-hower   ${visibleInEdditMode} ${isFormValid ? '' : buttonDisabled} `} disabled={!isFormValid || loading} onClick={handleSubmit}>Сохранить</button>
        </div>
    );
}

export default Profile;