import './Profile.css';
import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Profile(props) {

  const user = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email , setEmail] = React.useState('');

  React.useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]); 

  function handlerLogOut(e) {
    e.preventDefault();
    props.logeOut();
  }

  function editAccauntInfo(e) {
    e.preventDefault();
    props.edit({name, email: email});
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return(
    <section className='profile'>
      <div className='profile__wrapper'>
        <h1 className='profile__title'>Привет, {user.name}!</h1>
        <div className='profile__wrapper-info'>
          <label className='profile__text'>Имя</label>
          <input className='profile__input' id="edit-name-input" defaultValue={user.name} onChange={handleNameChange} placeholder="Введите имя" minLength="3" />
        </div>
        <div className='profile__wrapper-info'>
          <label className='profile__text'>E-mail</label>
          <input className='profile__input' id="edit-email-input" defaultValue={user.email}  onChange={handleEmailChange} placeholder="Введите почту" />
        </div>
        <button className='profile__button' onClick={editAccauntInfo}>Редактировать</button>
        <button className='profile__button profile__button_green' onClick={handlerLogOut}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;