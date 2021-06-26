import './MoviesCard.css';

function MoviesCard(props) {
  return(
    <div className='movies-card'>
      <img className='movies-card__img' src={props.img} alt='Превью фильма' />
      <div className='movies-card__wrapper'>
        <p className='movies-card__name'>{props.name}</p>
        <p className='movies-card__duration'>{props.duration}</p>
        <label className='movies-card__checkbox'>
          <input className='movies-card__checkbox-input' type='checkbox' />
          <span className="movies-card__checkbox-mark"></span>
        </label>
      </div>
    </div>
  );
}

export default MoviesCard;