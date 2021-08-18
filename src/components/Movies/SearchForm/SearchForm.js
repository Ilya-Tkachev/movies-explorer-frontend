import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return (
        <div className="search-form">
            <div className="search-form__elips">
                <input className="search-form__form" type="text" placeholder="Фильм"></input>
                <button className="search-form__button"></button>
            </div>
            <div className="search-form__switcher">
                <div className="search-form__switcher-title">Короткометражки</div>
                <label className="switch">
                    <input type="checkBox"></input>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
}

export default SearchForm;