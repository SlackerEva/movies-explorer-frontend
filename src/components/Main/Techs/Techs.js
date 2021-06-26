function Techs() {
  return(
    <section className='techs' id='techs'>
      <div className='tech__section-wrapper'>
        <h3 className='section-title'>Технологии</h3>
        <p className='techs__title'>7 технологий</p>
        <p className='section-text section-text_width'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className='techs__wrapper'>
          <div className='techs__box'>
            <p className='techs__box-name'>HTML</p>
          </div>
          <div className='techs__box'>
            <p className='techs__box-name'>CSS</p>
          </div>
          <div className='techs__box'>
            <p className='techs__box-name'>JS</p>
          </div>
          <div className='techs__box'>
            <p className='techs__box-name'>React</p>
          </div>
          <div className='techs__box'>
            <p className='techs__box-name'>Git</p>
          </div>
          <div className='techs__box'>
            <p className='techs__box-name'>Express.js</p>
          </div>
          <div className='techs__box'>
            <p className='techs__box-name'>mongoDB</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Techs;
