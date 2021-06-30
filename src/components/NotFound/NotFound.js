import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound() {

  return (
    <section className='error'>
      <div className='error__wrapper'>
        <h1 className='error__code'>404</h1>
        <p className='error__message'>Страница не найдена</p>
        <Link className='error__link' to='/'>Назад</Link>
      </div>
    </section>
  );
}

export default NotFound;