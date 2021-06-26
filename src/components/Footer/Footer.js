function Footer() {
  return(
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__wrapper'>
        <p className='footer__text'>&copy;2020</p>
        <div className='footer__wrapper-links'>
          <a className='footer__link' href='https://praktikum.yandex.ru'><p className='footer__text footer__text_position'>Яндекс.Практикум</p></a>
          <a className='footer__link' href='https://github.com/SlackerEva'><p className='footer__text footer__text_position'>GitHub</p></a>
          <a className='footer__link' href='https://www.linkedin.com/in/anna-lesiv-44a6a7154/'><p className='footer__text'>LinkedIn</p></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;