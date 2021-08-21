import React from 'react';
import './SearchForm.css';

function SearchForm() {

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
                <input className="search-form__form" type="text" placeholder="Фильм"></input>
                <button className="search-form__button"></button>
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