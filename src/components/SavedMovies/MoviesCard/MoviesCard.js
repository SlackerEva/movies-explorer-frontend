import './MoviesCard.css';


function MoviesCard(props) {
  console.log(props);
  return(
    <div className='movies-card'>
      <img className='movies-card__img' src={props.img} alt='Превью фильма' />
      <div className='movies-card__wrapper'>
        <p className='movies-card__name'>{props.name}</p>
        <p className='movies-card__duration'>{props.duration}</p>
        <button className='movies-card__button'></button>
      </div>
    </div>
  );
}

export default MoviesCard;