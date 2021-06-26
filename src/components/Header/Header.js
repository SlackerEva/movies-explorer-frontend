import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';

import account from '../../images/account.svg';

function Header(props) {
  if (props.path === '/') {
    return (
      <header className='header'>
        <img className='logo' src={logo} alt='Логотип' />
        <div className='header__wrapper'>
          <Link className='header__link' to='/sign-up'>Регистрация</Link>
          <Link className='header__link header__link_green' to='/sign-in'>Войти</Link>
        </div>
      </header>
    );
  } else {
    return (
      <header className='header'>
        <img className='logo' src={logo} alt='Логотип' />
        <button className='menu' onClick={props.isOpen} />
        <nav className='header__nav'>
          <div className='header__nav-wrapper'>
            <Link className='header__nav-link' to='/movies'>Фильмы</Link>
            <Link className='header__nav-link' to='/saved-movies'>Сохраненные фильмы</Link>
          </div>
          <div className='header__acc-wrapper'>
            <Link className='header__acc-link' to='/profile'>Аккаунт
              <div className='header__acc-img'>
                <img className='header__img' src={account} alt='Иконка профиля' />
              </div>
            </Link>  
          </div>
        </nav>

      </header>
    );
  }

}

export default Header;