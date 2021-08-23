import React from 'react';
import './MovieCard.css'
import { useLocation } from 'react-router-dom';
import { SAVED_MOVIES } from '../../../utils/urlConstants'

function MovieCard({ card }) {
    const [isLiked, setIsLiked] = React.useState(card.isLiked);
    const location = useLocation();

    var classNameLike = "button button-type-like ";
    var classNameLiked = "button button-type-like-pressed";

    function toggleLike() { // Просто заглушка, что бы проверить, как верстка рабоатет
        if (isLiked) {
            card.isLiked = false;
            setIsLiked(false)
        } else {
            card.isLiked = true;
            setIsLiked(true)
        }
    }

    function renderButton() {
        var buttonHtml = undefined;
        if (location.pathname === SAVED_MOVIES) {
            buttonHtml = (<button className="button button-type-delete object-hower" type="button" />);
        } else {
            if (isLiked === true) {
                buttonHtml = (<button className={`button ${classNameLiked} object-hower`} type="button" onClick={toggleLike} />);
            } else {
                buttonHtml = (<button className={`button ${classNameLike} object-hower`} type="button" onClick={toggleLike}>Сохранить</button>);
            }
        }
        return buttonHtml;
    }

    return (
        <section className="movie-card">
            <div className="movie-card__title-like">
                <div className="movie-card__title text-overflow-formatting">{card.name}</div>
                <p className="movie-card__time">{card.time}</p>
            </div>
            <img className="movie-card__photo" alt={`Alt ${card.name}`} src={card.imgLink} />
            {renderButton()}
        </section>
    );
}

export default MovieCard;