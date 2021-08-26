import React from 'react';
import './SearchForm.css';

function SearchForm({onMovieSearch, onTimeLimit, setMoreCounter}) {
    const [movieName, setMovieName] = React.useState('');
    const [timeLimit, setTimeLimit] = React.useState(false);

    function handleSearchFormChange(event) {
        setMovieName(event.target.value);
    }

    function handleTimeLimitToggle(){
        setTimeLimit(!timeLimit);
        onTimeLimit(!timeLimit);
    }

    function handleSubmit() {
        onMovieSearch(movieName);
        setMoreCounter(0);
    }

    const switchContent = (
        <>
            <label className="switch">
                <input type="checkBox" onClick={handleTimeLimitToggle}></input>
                <span className="slider round"></span>
            </label>
            <div className="search-form__switcher-title">Короткометражки</div>
        </>
    )

    return (
        <div className="search-form">
            <div className="search-form__elips">
                <div className="search-form__search-icon"></div>
                <input className="search-form__form" type="text" placeholder="Фильм" required autoComplete="off" onChange={handleSearchFormChange} value={movieName} />
                <button className="search-form__button object-hower" onClick={handleSubmit}></button>
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