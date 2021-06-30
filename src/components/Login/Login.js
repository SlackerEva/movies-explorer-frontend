import './Login.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';

function Login() {
  return(
    <section className='register'>
      <img className='logo logo_padding' src={logo} alt='Логотип' />
      <h1 className='register__title'>Рады видеть!</h1>
      <form className='form'>
        <label className='form__label'>E-mail</label>
        <input className='form__input' />
        <label className='form__label'>Пароль</label>
        <input className='form__input' />
      </form>
      <button className='main-button'>Войти</button>
      <div className='register__wrapper'>
        <p className='register__text'>Еще не зарегистрированы?</p>
        <Link className='register__link' to='/sign-up'>Регистрация</Link>
      </div>

    </section>
  );
}

export default Login;

