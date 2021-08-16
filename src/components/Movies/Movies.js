import React from 'react';
import './Movies.css';
import SerachForm from './SearchForm/SearchForm'
import MovieCard from './MovieCard/MovieCard'

function Movies({ /*cards,*/ onCardClick, onCardLike, onCardDelete }) {

    const cards = [
        {
            _id: 1,
            name: 'Время',
            link: 'https://www.kinopoisk.ru/film/517988/',
            imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
            isLiked: false,
            time: '1ч 53м'
        },
        {
            _id: 2,
            name: 'Время',
            link: 'https://www.kinopoisk.ru/film/517988/',
            imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
            isLiked: false,
            time: '1ч 53м'
        },
        {
            _id: 3,
            name: 'Время',
            link: 'https://www.kinopoisk.ru/film/517988/',
            imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
            isLiked: false,
            time: '1ч 53м'
        },
        {
            _id: 4,
            name: 'Время',
            link: 'https://www.kinopoisk.ru/film/517988/',
            imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
            isLiked: false,
            time: '1ч 53м'
        },
        {
            _id: 5,
            name: 'Время',
            link: 'https://www.kinopoisk.ru/film/517988/',
            imgLink: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/2a19ad11-c1d9-452b-a06a-85f90790fe10/960x960',
            isLiked: false,
            time: '1ч 53м'
        },
    ];

    return (
        <section className="movies">
            <SerachForm />
            <section className="movies__gellery">
                {cards && cards.map(card => {
                    return (<MovieCard key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />);
                })}
            </section>
            <button className="movies__more" type="button">Еще</button>
        </section>
    );
}

export default Movies;