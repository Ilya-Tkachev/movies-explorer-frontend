import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__subtitle">Портфолио</h2>
      <li className="portfolio__links">
        <ul className="portfolio__link-item">
          <a className="portfolio__link object-hower" href="https://ya.ru/" target="_blank" rel="noopener noreferrer">Статичный сайт</a>
          <div className="portfolio__link-arrow"></div>
        </ul>
        <ul className="portfolio__link-item">
          <a className="portfolio__link object-hower" href="https://ya.ru/" target="_blank" rel="noopener noreferrer">Адаптивный сайт</a>
          <div className="portfolio__link-arrow"></div>
        </ul>
        <ul className="portfolio__link-item">
          <a className="portfolio__link object-hower" href="https://ya.ru/" target="_blank" rel="noopener noreferrer">Одностраничное приложение</a>
          <div className="portfolio__link-arrow"></div>
        </ul>
      </li>
    </div>
  );
}

export default Portfolio;