import './Login.css';
import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';

function Login(props) {

  const [data, setData] = React.useState({
    password: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    props.onLogin(data);
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
      <h1 className='register__title'>Рады видеть!</h1>
      <form className='form'>
        <label className='form__label'>E-mail</label>
        <input className='form__input' id="email-input" type="url" value={data.email} name="email" onChange={handleChange} placeholder="Email" required />
        <label className='form__label'>Пароль</label>
        <input className='form__input' id="password-input" type="url" value={data.password} name="password" onChange={handleChange} placeholder="Пароль" required />
      </form>
      <button className='main-button' onClick={handleSubmit}>Войти</button>
      <div className='register__wrapper'>
        <p className='register__text'>Еще не зарегистрированы?</p>
        <Link className='register__link' to='/sign-up'>Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;

