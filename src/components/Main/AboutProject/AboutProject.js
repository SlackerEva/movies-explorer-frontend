function AboutProject() {
  return(
    <section className='about-project' id='project'>
      <h3 className='section-title'>О проекте</h3>
      <div className='about-project__wrapper'>
        <p className='about-project__title'>Дипломный проект включал 5 этапов</p>
        <p className='about-project__title about-project__title_weeks'>На выполнение диплома ушло 5 недель</p>
        <p className='section-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className='section-text section-text_weeks'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className='about-project__timebox'>
        <div className='about-project__green about-project__timebox_position'>
          <p className='about-project__text'>1 неделя</p>
        </div>
        <div className='about-project__grey about-project__timebox_position'>
          <p className='about-project__text'>4 недели</p>
        </div>
        <div className='about-project__black about-project__timebox_position'>
          <p className='about-project__text'>Back-end</p>
        </div>
        <div className='about-project__black about-project__timebox_position'>
          <p className='about-project__text'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
