import React from 'react';
import './SearchForm.css';

function SearchForm() {
    const [movieName, setMovieName] = React.useState('');

    function handleUserNameChange(event) {
        setMovieName(event.target.value);
    }

    const switchContent = (
        <>
            <label className="switch">
                <input type="checkBox"></input>
                <span className="slider round"></span>
            </label>
            <div className="search-form__switcher-title">Короткометражки</div>
        </>
    )

    return (
        <div className="search-form">
            <div className="search-form__elips">
                <div className="search-form__search-icon"></div>
                <input className="search-form__form" type="text" placeholder="Фильм" required autoComplete="off" onChange={handleUserNameChange} value={movieName} />
                <button className="search-form__button object-hower"></button>
                <div className="search-form__switcher normal-rezolution">
                    {switchContent}
                </div>
            </div>
            <div className="search-form__switcher small-rezolution">
                {switchContent}
            </div>
        </div>
    );
}

export default SearchForm;