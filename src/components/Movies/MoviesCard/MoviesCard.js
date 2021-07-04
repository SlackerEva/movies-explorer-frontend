import './MoviesCard.css';

function MoviesCard(props) {

  function calculateDuration(duration) {
    return Math.floor(duration / 60) + 'ч' + duration % 60 +'м';
  }

  function opentrailerLink() {
    window.open(props.card.trailerLink);
  }

  console.log(props.card);

  return(
    <div className='movies-card'>
      <button className='movies-card__img-button' onClick={opentrailerLink}>
        <img className='movies-card__img' src={'https://api.nomoreparties.co' + props.card.image.url} alt='Превью фильма' />
      </button>
      <div className='movies-card__wrapper'>
        <p className='movies-card__name'>{props.card.nameRU}</p>
        <p className='movies-card__duration'>{calculateDuration(props.card.duration)}</p>
        <label className='movies-card__checkbox'>
          <input className='movies-card__checkbox-input' type='checkbox' />
          <span className="movies-card__checkbox-mark"></span>
        </label>
      </div>
    </div>
  );
}

export default MoviesCard;
