import './Profile.css';
import {Link} from "react-router-dom";

function Profile() {
  return(
    <section className='profile'>
      <div className='profile__wrapper'>
        <h1 className='profile__title'>Привет, Виталий!</h1>
        <div className='profile__wrapper-info'>
          <p className='profile__text'>Имя</p>
          <p className='profile__text'>Виталий</p>
        </div>
        <div className='profile__wrapper-info'>
          <p className='profile__text'>E-mail</p>
          <p className='profile__text'>pochta@yandex.ru</p>
        </div>
        <Link className='profile__link' to='/edit'>Редактировать</Link>
        <Link className='profile__link profile__link_green' to='/logout'>Выйти из аккаунта</Link>
      </div>
    </section>
  );
}

export default Profile;