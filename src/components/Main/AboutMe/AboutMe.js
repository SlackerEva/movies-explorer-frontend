import myFoto from '../../../images/foto.png';

function AboutMe() {
  return(
    <section className='about-me' id='aboutme'>
      <h3 className='section-title'>Студент</h3>
      <div className='about-me__wrapper'>
        <h4 className='about-me__title'>Виталий</h4>
        <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
        <p className='section-text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
          Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.</p>
        <img className='about-me__foto' src={myFoto} alt='Мое фото'/>
        <div className='about-me__wrapper-links'>
          <a className='about-me__link' href='https://www.linkedin.com/in/anna-lesiv-44a6a7154/'>LinkedIn</a>
          <a className='about-me__link' href='https://github.com/SlackerEva'>GitHub</a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
