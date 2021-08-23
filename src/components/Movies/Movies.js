import React from 'react';
import './Movies.css';
import SerachForm from './SearchForm/SearchForm'
import MovieCard from './MovieCard/MovieCard'

function Movies({ cards, onCardClick, onCardLike, onCardDelete }) {

    return (
        <section className="movies">
            <SerachForm />
            <section className="movies__gellery">
                {cards && cards.map(card => {
                    return (<MovieCard key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />);
                })}
            </section>
            <button className="movies__more object-hower" type="button">Еще</button>
        </section>
    );
}

export default Movies;