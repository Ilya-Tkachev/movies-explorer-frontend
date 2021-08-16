import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
      <div className="about-project" id="about">
        <h1 className="about-project__headline">О проекте</h1>
        <div className="about-project__two-column-text">
            <div className="about-project__column">
              <h2 className="about-project__subheading">Дипломный проект включал 5 этапов</h2>
              <text className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</text>
            </div>
            <div className="about-project__column">
              <h2 className="about-project__subheading">На выполнение диплома ушло 5 недель</h2>
              <text className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</text>
            </div>
          </div>
        <div className="about-project__progress-bar">
          <div className="about-project__progress-backend">1 неделя</div>
          <div className="about-project__progress-frontend">4 недели</div>
          <p className="about-project__progress-bar-text">Back-end</p>
          <p className="about-project__progress-bar-text">Front-end</p>
        </div>
      </div>
    );
  }
  
  export default AboutProject;