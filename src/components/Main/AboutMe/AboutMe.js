import React from 'react';
import './AboutMe.css';

function AboutMe() {
  return (
    <div className="about-me" id="student">
      <h1 className="about-me__headline">Студент</h1>
      <div className="about-me__two-column">
        <div className="about-me__info">
          <h2 className="about-me__name">Коталий</h2>
          <p className="about-me__brief">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__detailed">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about-me__social-links">
            <li><a className="about-me__social-link object-hower" href="https://ru-ru.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a className="about-me__social-link object-hower" href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a></li>
          </ul>
        </div>
        <div className="about-me__photo"></div>
      </div>
    </div>
  );
}

export default AboutMe;