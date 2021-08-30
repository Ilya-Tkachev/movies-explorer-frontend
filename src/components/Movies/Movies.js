import React from 'react';
import './Movies.css';
import { useLocation } from 'react-router-dom';
import { MOVIES, EMPTY_STRING, SHORT_TIME_MOVIE_LIMIT, CARDS_1280_768, CARDS_768_480, CARDS_480_320, SERCHED_MOVIES, TIME_SWITCHER, SAVED_MOVIES } from '../../utils/Constants'
import SerachForm from './SearchForm/SearchForm'
import MovieCard from './MovieCard/MovieCard'
import Preloader from './Preloader/Preloader'

function Movies({ onLoadMovies, allMovies, onLoadSavedMovies, savedMovies, onMovieSave, onMovieDelete }) {
    const location = useLocation();
    const [error, setError] = React.useState(undefined);
    const [moviesShown, setMoviesShown] = React.useState([]);
    const [searchedName, setSearchedName] = React.useState(EMPTY_STRING);
    const [timeLimit, setTimeLimit] = React.useState(false);
    const [allMoviesShown, setAllMoviesShown] = React.useState(false);


    React.useEffect(() => {
        if (allMovies === undefined || allMovies.length === 0) onLoadMovies(setError);
        if (savedMovies === undefined) onLoadSavedMovies(setError);
        if (location.pathname === MOVIES) {
            const previouslySearchedName = localStorage.getItem(SERCHED_MOVIES) ?? EMPTY_STRING;
            const rawTimeValue = localStorage.getItem(TIME_SWITCHER);
            const previouslySetTime = rawTimeValue ? (rawTimeValue.toLowerCase() === 'true' ? true : false) : false;
            renderAllMovies(previouslySearchedName, previouslySetTime);
        } else {
            renderSavedMovies(EMPTY_STRING, false);
        }
    }, [allMovies, savedMovies, location.pathname ])

    const filterByNameSaved = (movie, searchedName) => searchedName === EMPTY_STRING ? true : movie.nameRU.toLowerCase().includes(searchedName.toLowerCase());
    const filterByNameAll = (movie, searchedName) => searchedName === EMPTY_STRING ? false : movie.nameRU.toLowerCase().includes(searchedName.toLowerCase());
    const filterByTime = (movie, timeLimit) => timeLimit === true ? movie.duration <= SHORT_TIME_MOVIE_LIMIT : true;

    function renderMovies(searchedName, timeLimit) {
        location.pathname === MOVIES ? renderAllMovies(searchedName, timeLimit) : renderSavedMovies(searchedName, timeLimit);
    }

    function renderAllMovies(searchedName, timeLimit) {
        console.log(`renderAllMovies called ${searchedName} ${timeLimit}`);
        if (allMovies && allMovies.length > 0 && savedMovies) {
            setAllMoviesShown(false);
            setSearchedName(searchedName);
            setTimeLimit(timeLimit);
            localStorage.setItem(SERCHED_MOVIES, searchedName);
            localStorage.setItem(TIME_SWITCHER, timeLimit);
            const movies = allMovies
                .filter(movie => filterByNameAll(movie, searchedName))
                .filter(movie => filterByTime(movie, timeLimit))
                .map(movie => {
                    const saved = savedMovies.find(savedMovie => savedMovie.nameRU === movie.nameRU);
                    const isSaved = saved !== undefined;
                    if (isSaved) movie._id = saved._id; // Устанавливаем id из базы, что бы потом можно было удалить нормально
                    return (<MovieCard key={movie.movieId} movie={movie} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} isSaved={isSaved} />)
                });
            const { initialSize, rowSize } = getCardsLayoutSizes();
            const chunkSizeToShow = moviesShown.length === 0 ? initialSize : (moviesShown.length + rowSize);
            if (chunkSizeToShow < movies.length) {
                setMoviesShown(movies.slice(0, chunkSizeToShow));
            } else {
                setAllMoviesShown(true);
                setMoviesShown(movies);
            }
        } else {
            console.log(`renderAllMovies all movies still loading`);
        }
    }

    function renderSavedMovies(searchedName, timeLimit) {
        console.log(`renderSavedMovies called ${searchedName} ${timeLimit}`);
        if (savedMovies) {
            setSearchedName(searchedName);
            setTimeLimit(timeLimit);
            const movies = savedMovies
                .filter(movie => filterByNameSaved(movie, searchedName))
                .filter(movie => filterByTime(movie, timeLimit))
                .map(movie => { return (<MovieCard key={movie.movieId} movie={movie} onMovieSave={onMovieSave} onMovieDelete={onMovieDelete} isSaved={true} />) })
            setMoviesShown(movies);
            setAllMoviesShown(true);
        } else {
            console.log(`renderSavedMovies saved movies still loading`);
        }
    }

    function numberIsBetween(x, min, max) {
        return x >= min && x <= max;
    }

    function getCardsLayoutSizes() {
        const currentWidth = window.screen.width;
        var initialSize = 0;
        var rowSize = 0;
        switch (true) {
            case numberIsBetween(currentWidth, CARDS_1280_768.resolutionMin, CARDS_1280_768.resolutionMax):
                initialSize = CARDS_1280_768.initialSize;
                rowSize = CARDS_1280_768.rowSize;
                break;
            case numberIsBetween(currentWidth, CARDS_768_480.resolutionMin, CARDS_768_480.resolutionMax):
                initialSize = CARDS_768_480.initialSize;
                rowSize = CARDS_768_480.rowSize;
                break;
            case numberIsBetween(currentWidth, CARDS_480_320.resolutionMin, CARDS_480_320.resolutionMax):
                initialSize = CARDS_480_320.initialSize;
                rowSize = CARDS_480_320.rowSize;
                break;
            default:
                console.error('Не должны сюда попадать, проблема с определением разрешения экрана и размера карточек');
                break;
        }
        return { initialSize: initialSize, rowSize: rowSize };
    }

    function handleMoreCounterChange() {
        renderMovies(searchedName, timeLimit);
    }

    function renderButton() {
        return (searchedName === EMPTY_STRING || allMoviesShown) ? 'invisible' : EMPTY_STRING;
    }

    return (
        <section className="movies">
            <SerachForm renderMovies={(name, time) => renderMovies(name, time)} initailMovieName={searchedName} initailTimeLimit={timeLimit} />
            {(allMovies === undefined || allMovies.length === 0) && !error ? <Preloader /> : <section className="movies__gellery">{moviesShown}</section>}
            {error && <p>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>}
            <button className={`movies__more object-hower ${renderButton()}`} type="button" onClick={handleMoreCounterChange}>Еще</button>
        </section>
    );
}

export default Movies;