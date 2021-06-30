function Portfolio() {
  return(
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <div className='portfolio__wrapper'>
        <div className='portfolio__line'>
          <a className='portfolio__link' href='https://slackereva.github.io/russian-travel/'>
            <p className='portfolio__text'>Статичный сайт</p>
            <p className='portfolio__text'>↗</p>
          </a>
        </div>
        <div className='portfolio__line'>
          <a className='portfolio__link' href='https://slackereva.github.io/russian-travel/'>
            <p className='portfolio__text'>Адаптивный сайт</p>
            <p className='portfolio__text'>↗</p>
          </a>
        </div>
        <div className='portfolio__line'>
          <a className='portfolio__link' href='https://slackereva.github.io/russian-travel/'>
            <p className='portfolio__text'>Одностраничное приложение</p>
            <p className='portfolio__text'>↗</p>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
