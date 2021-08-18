import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <div className="techs" id="technologies">
      <h1 className="techs__headline">Технологии</h1>
      <h2 className="techs__subheading">7 технологий</h2>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__links">
        <li>
          <a href="https://developer.mozilla.org/ru/docs/Web/HTML" className="techs__list-item-text object-hower" target="_blank" rel="noopener noreferrer">
            <div className="techs__list-item">HTML</div>
          </a>
        </li>
        <li>
          <a href="https://developer.mozilla.org/ru/docs/Web/CSS" className="techs__list-item-text object-hower" target="_blank" rel="noopener noreferrer">
            <div className="techs__list-item">CSS</div>
          </a>
        </li>
        <li>
          <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript" className="techs__list-item-text object-hower" target="_blank" rel="noopener noreferrer">
            <div className="techs__list-item">JS</div>
          </a>
        </li>
        <li>
          <a href="https://ru.reactjs.org/" className="techs__list-item-text object-hower" target="_blank" rel="noopener noreferrer">
            <div className="techs__list-item">React</div>
          </a>
        </li>
        <li>
          <a href="https://github.com/" className="techs__list-item-text object-hower" target="_blank" rel="noopener noreferrer">
            <div className="techs__list-item">Git</div>
          </a>
        </li>
        <li>
          <a href="https://expressjs.com/ru/" className="techs__list-item-text object-hower" target="_blank" rel="noopener noreferrer">
            <div className="techs__list-item">Express.js</div>
          </a>
        </li>
        <li>
          <a href="https://www.mongodb.com/" className="techs__list-item-text object-hower" target="_blank" rel="noopener noreferrer">
            <div className="techs__list-item">mongoDB</div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Techs;