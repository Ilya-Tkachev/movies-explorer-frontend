import React from 'react';
import './MovieCard.css'
import { useLocation } from 'react-router-dom';
import { MOVIES } from '../../../utils/Constants'

function MovieCard({ movie, onMovieSave, onMovieDelete, isSaved }) {
    const location = useLocation();
    const classNameLike = "button button-type-like ";
    const classNameLiked = "button button-type-like-pressed";

    function handleMovieSave() {
        onMovieSave(movie);
    }

    function handleMoviesDelete() {
        onMovieDelete(movie._id);
    }

    function renderButton() {
        var buttonHtml = undefined;
        if (location.pathname === MOVIES) {
            if (isSaved) {
                buttonHtml = (<button className={`button ${classNameLiked} object-hower`} type="button" onClick={handleMoviesDelete} />);
            } else {
                buttonHtml = (<button className={`button ${classNameLike} object-hower`} type="button" onClick={handleMovieSave}>Сохранить</button>);
            }
        } else {
            buttonHtml = (<button className="button button-type-delete object-hower" type="button" onClick={handleMoviesDelete} />);
        }
        return buttonHtml;
    }

    return (
        <section className="movie-card">
            <div className="movie-card__title-like">
                <div className="movie-card__title text-overflow-formatting">{movie.nameRU}</div>
                <p className="movie-card__time">{movie.duration} минут</p>
            </div>
            <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img className="movie-card__photo" alt={`Alt ${movie.nameRU}`} src={movie.image} />
            </a>
            {renderButton()}
        </section>
    );
}

export default MovieCard;