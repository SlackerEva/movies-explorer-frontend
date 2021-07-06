import './Register.css';
import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';

function Register(props) {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(data);
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setData(state => ({
      ...state,
      [name]: value
    }));
  }

  return(
    <section className='register'>
      <img className='logo logo_padding' src={logo} alt='Логотип' />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='form'>
        <label className='form__label'>Имя</label>
        <input className='form__input' type="url" name="name" value={data.name} onChange={handleChange} placeholder="Имя" required />
        <label className='form__label'>E-mail</label>
        <input className='form__input' type="url" name="email" value={data.email} onChange={handleChange} placeholder="Email" required />
        <label className='form__label'>Пароль</label>
        <input className='form__input'  type="url" name="password" value={data.password} onChange={handleChange} placeholder="Пароль" required />
      </form>
      <button className='main-button' onClick={handleSubmit}>Зарегистрироваться</button>
      <div className='register__wrapper'>
        <p className='register__text'>Уже зарегистрированы?</p>
        <Link className='register__link' to='/sign-in'>Войти</Link>
      </div>

    </section>
  );
}

export default Register;

