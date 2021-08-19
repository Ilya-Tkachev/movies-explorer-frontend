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

    function renderButton () {
        var buttonHtml = undefined;
        if (location.pathname === SAVED_MOVIES) {
            buttonHtml = (<button className="button button-type-delete" type="button" />)
        } else (
            buttonHtml = (<button className={isLiked ? classNameLiked : classNameLike} type="button" onClick={toggleLike} />)
        )
        return buttonHtml;
    }

    return (
        <section className="movie-card">
            <img className="movie-card__photo" alt={`Alt ${card.name}`} src={card.imgLink} />
            <div className="movie-card__title-like">
                <div className="movie-card__title text-overflow-formatting">
                    {card.name}
                </div>
                {renderButton()}
            </div>
            <p className="movie-card__time">{card.time}</p>
        </section>
    );
}

export default MovieCard;