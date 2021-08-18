import React from 'react';
import './NavTab.css';

function NavTab() {
    return (
      <div className="nav-tab">
        <ul className="nav-bar__links">
          <li><a className="nav-bar__list-item object-hower" href="#about">О проекте</a></li>
          <li><a className="nav-bar__list-item object-hower" href="#technologies">Технологии</a></li>
          <li><a className="nav-bar__list-item object-hower" href="#student">Студент</a></li>
        </ul>
      </div>
    );
  }
  
  export default NavTab;