import './Profile.css';
import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { useValidation } from '../Validation/Validation';

function Profile(props) {
  const user = React.useContext(CurrentUserContext);
  const [isEdit , setIsEdit] = React.useState(false);
  const {values, handleErrors, errors, isValid} = useValidation();

  function handleEdit() {
    setIsEdit(!isEdit);
  }

  function handlerLogOut(e) {
    e.preventDefault();
    props.logeOut();
  }

  function editAccauntInfo(e) {
    e.preventDefault();
    props.edit(values.name || user.name, values.email || user.email);
    setIsEdit(false);
  }

  return(
    <section className='profile'>
      <div className='profile__wrapper'>
        <h1 className='profile__title'>Привет, {user.name}!</h1>
        <form className='form'>
          <div className='profile__wrapper-info'>
            <label className='profile__text'>Имя</label>
            <input className={`profile__input ${errors.name ? 'profile__input-error' : ''}`} id="edit-name-input" disabled={!isEdit} type="text" name="name" defaultValue={user.name} onChange={handleErrors} placeholder="Введите имя" minLength="3" maxLength="40" required />          
          </div>
          <span className="edit-input-error input-error">{errors.name}</span>
          <div className='profile__wrapper-info'>
            <label className='profile__text'>E-mail</label>
            <input className={`profile__input ${errors.email ? 'profile__input-error' : ''}`} id="edit-email-input" disabled={!isEdit} type="email" name="email" defaultValue={user.email}  onChange={handleErrors} placeholder="Введите почту" /> 
          </div>
          <span className="edit-input-error input-error">{errors.email}</span>
        </form>
        {isEdit ? 
          <button  className={`profile__button ${!isValid ? 'profile__button-disable' : ''}`} onClick={editAccauntInfo} disabled={!isValid} >Сохранить</button> :
          <button className='profile__button profile__button-disable'  onClick={handleEdit}>Редактировать</button>}
        <button className='profile__button profile__button_green' onClick={handlerLogOut}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;
/*
<div className='profile__setup'>
{isEdit ? <button type="submit" onClick={handleSubmit} disabled={!isValid} className={`profile__setup_edit ${!isValid && 'profile__setup_edit_disabled'}`}>Сохранить</button>
  : <button type="button" onClick={handleOnEdit} className='profile__setup_edit'>Редактировать</button>}
<button type="button" onClick={value.signOut} className='profile__setup_out'>Выйти из аккаунта</button>
</div>*/