import './Register.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';

function Register() {
  return(
    <section className='register'>
      <img className='logo logo_padding' src={logo} alt='Логотип' />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='form'>
        <label className='form__label'>Имя</label>
        <input className='form__input' />
        <label className='form__label'>E-mail</label>
        <input className='form__input' />
        <label className='form__label'>Пароль</label>
        <input className='form__input' />
      </form>
      <button className='main-button'>Зарегистрироваться</button>
      <div className='register__wrapper'>
        <p className='register__text'>Уже зарегистрированы?</p>
        <Link className='register__link' to='/sign-in'>Войти</Link>
      </div>

    </section>
  );
}

export default Register;

