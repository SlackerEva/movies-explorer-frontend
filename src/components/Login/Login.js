import './Login.css';
import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';
import { useValidation } from '../Validation/Validation';

function Login(props) {
  const {values, handleErrors, errors, isValid} = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password);
  }

  return(
    <section className='register'>
      <img className='logo logo_padding' src={logo} alt='Логотип' />
      <h1 className='register__title'>Рады видеть!</h1>
      <form className='form'>
        <label className='form__label'>E-mail</label>
          <input className={`form__input ${errors.email ? 'form__input-error' : ''}`} id="email-input" type="email" name="email" value={values.email} onChange={handleErrors} placeholder="Email" required />
          <span className="email-input-error input-error">{errors.email}</span>
        <label className='form__label'>Пароль</label>
          <input className={`form__input ${errors.password ? 'form__input-error' : ''}`} id="password-input" type="password" name="password" value={values.password} onChange={handleErrors} placeholder="Пароль" minLength="3" maxLength="20" required />
          <span className="password-input-error input-error">{errors.password}</span>
      </form>
      <button className={`main-button ${!isValid ? 'main-button-disable' : ''}`} onClick={handleSubmit} disabled={!isValid}>Войти</button>
      <div className='register__wrapper'>
        <p className='register__text'>Еще не зарегистрированы?</p>
        <Link className='register__link' to='/sign-up'>Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;

