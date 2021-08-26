import React from 'react';
import './Movies.css';
import { useLocation } from 'react-router-dom';
import { MOVIES, SAVED_MOVIES } from '../../utils/urlConstants'
import SerachForm from './SearchForm/SearchForm'
import MovieCard from './MovieCard/MovieCard'
import Preloader from './Preloader/Preloader'

function Movies({ onLoadMovies, allMovies, onLoadSavedMovies, savedMovies, onMovieSave, onMovieDelete }) {
    const shortTimeMovieLimit = 60;
    const defaultChunkSize = 9;
    const chunkSize = 3;
    const location = useLocation();

    const [searchedName, setSearchedName] = React.useState('');
    const [timeLimit, setTimeLimit] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [moreCounter, setMoreCounter] = React.useState(0);

    React.useEffect(() => {
        setLoading(true);
        if (allMovies === undefined || allMovies.length === 0) onLoadMovies();
        if (savedMovies === undefined || savedMovies.length === 0) onLoadSavedMovies();
        setLoading(false);
    }, [])

    const filterByNameSaved = (movie) => searchedName === '' ? true : movie.nameRU.toLowerCase().includes(searchedName.toLowerCase());
    const filterByNameAll = (movie) => searchedName === '' ? false : movie.nameRU.toLowerCase().includes(searchedName.toLowerCase());
    const filterByTime = (movie) => timeLimit ? movie.duration <= shortTimeMovieLimit : true;

    const renderMovies = () => {
        if (loading) {
            return (<Preloader />);
        } else {
            const movies = (location.pathname === MOVIES ? allMovies : savedMovies)
                .filter(movie => location.pathname === MOVIES ? filterByNameAll(movie) : filterByNameSaved(movie))
                .filter(movie => filterByTime(movie))
                .map(movie => {
                    return (<MovieCard
                        key={movie.movieId}
                        movie={movie}
                        onMovieSave={onMovieSave}
                        onMovieDelete={onMovieDelete}
                        isSaved={savedMovies.some(savedMovie => savedMovie.nameRU === movie.nameRU)} />)
                })
            const chunkSizeToShow = defaultChunkSize + (moreCounter * chunkSize);    
            return movies.slice(0, chunkSizeToShow <= movies.length ? chunkSizeToShow : movies.length);
        }
    }

    function handleMoreCounterChange() {
        setMoreCounter(moreCounter + 1)
    }

    return (
        <section className="movies">
            <SerachForm onMovieSearch={setSearchedName} onTimeLimit={setTimeLimit} setMoreCounter={setMoreCounter}/>
            <section className="movies__gellery">
                {renderMovies()}
            </section>
            <button className={`movies__more object-hower ${location.pathname === SAVED_MOVIES ? 'invisible' : ''}`} type="button" onClick={handleMoreCounterChange}>Еще</button>
        </section>
    );
}

export default Movies;