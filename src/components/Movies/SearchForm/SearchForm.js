import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return (
        <div className="search-form">
            <div className="search-form__elips">
                <input className="search-form__form" type="string" placeholder="Фильм"></input>
                <button className="search-form__button"></button>
            </div>
            <div className="search-form__switcher">
                <label className="search-form__switcher-title">Короткометражки
                    <input className="search-form__switcher-invisible" type="checkBox"></input>
                    <span className="search-form__switcher-visible"></span>
                </label>
            </div>
        </div>
    );
}

export default SearchForm;