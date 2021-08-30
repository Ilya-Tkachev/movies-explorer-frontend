import React from 'react';
import './SearchForm.css';
import { EMPTY_STRING } from '../../../utils/Constants'

function SearchForm({ renderMovies, initailMovieName, initailTimeLimit }) {
    const [movieName, setMovieName] = React.useState(EMPTY_STRING);
    const [timeLimit, setTimeLimit] = React.useState(false);

    React.useEffect(() => {
        setMovieName(initailMovieName);
        setTimeLimit(initailTimeLimit);
    }, [initailMovieName, initailTimeLimit])

    function handleSearchFormChange(event) {
        setMovieName(event.target.value);
    }

    function handleTimeLimitToggle(event) {
        setTimeLimit(event.target.checked);
        renderMovies(movieName, event.target.checked);
    }

    function handleSubmit() {
        renderMovies(movieName, timeLimit);
    }

    const switchContent = (
        <>
            <label className="switch">
                <input type="checkBox" onChange={handleTimeLimitToggle} value={timeLimit} checked={timeLimit}></input>
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