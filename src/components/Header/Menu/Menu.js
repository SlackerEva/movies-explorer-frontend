import React from 'react';
import './Menu.css';
import account from '../../../images/account.svg';
import {Link} from 'react-router-dom';

function Menu(props) {
return(
    <div className={`menu__section ${props.isOpen ? "popup_opened" : ""}`}>
      <div className='menu__wrapper-button'>
        <button className='menu__close' onClick={props.onClose}></button>
      </div>
      <div className='menu__wrapper'>
        <Link className='menu__link' to='/'>Главная</Link>
        <Link className='menu__link' to='/movies'>Фильмы</Link>
        <Link className='menu__link' to='/saved-movies'>Сохраненные фильмы</Link>
      </div>
      <div className='header__acc-wrapper menu__acc-wrapper'>
        <Link className='header__acc-link' to='/profile'>Аккаунт
          <div className='header__acc-img'>
            <img className='header__img' src={account} alt='Иконка профиля' />
          </div>
        </Link>  
      </div>
    </div>
  );
}

export default Menu;