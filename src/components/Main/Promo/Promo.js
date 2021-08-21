import React from 'react';
import './Promo.css';
import planetLogoPath from '../../../images/planet.svg';

function Promo() {
    return (
      <div className="promo">
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета <br/> Веб-разработки.</h1>
          <p className="promo__sub-title">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className="promo__button object-hower">
            <p className="promo__button-text">Узнать больше</p>
          </button>
        </div>
        <img className="promo__logo" src={planetLogoPath} alt="Изображение планеты" />
      </div>
    );
  }
  
  export default Promo;