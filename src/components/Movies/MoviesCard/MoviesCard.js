import './MoviesCard.css';
import React from 'react';
import apiMain from '../../../utils/MainApi';

function MoviesCard(props) {
  const [check, setCheck] = React.useState(props.check);
 // const [MovieId, setMovieId] = React.useState('');

  function calculateDuration(duration) {
    return Math.floor(duration / 60) + 'ч' + duration % 60 +'м';
  }

  function opentrailerLink() {
    window.open(props.card.trailerLink);
  }

  function switchLikeMovie() {
    setCheck(!check);
    if (check === false) {
      apiMain.addMovie(props.card)
        .then((values) => {
          setCheck(true);
        })
        .catch((err)=>{
          console.log(err);
        });
    } else {
      setCheck(false);
      props.removeMovie(props.card.id);
    }
  }
      
  function handleRemoveCard(e) {
    e.preventDefault();
    props.removeMovie(props.card.id);
  }

  if (!props.isSaved) {
    return(
      <div className='movies-card'>
        <button className='movies-card__img-button' onClick={opentrailerLink}>
          <img className='movies-card__img' src={'https://api.nomoreparties.co' + props.card.image.url} alt='Превью фильма' />
        </button>
        <div className='movies-card__wrapper'>
          <p className='movies-card__name'>{props.card.nameRU}</p>
          <p className='movies-card__duration'>{calculateDuration(props.card.duration)}</p>
          <label className='movies-card__checkbox'>
            <input className='movies-card__checkbox-input' type='checkbox' checked={check} onChange={switchLikeMovie}  />
            <span className="movies-card__checkbox-mark"></span>
          </label>
        </div>
      </div>
    );
  } else {
    return(
      <div className='movies-card'>
        <button className='movies-card__img-button'>
          <img className='movies-card__img' src={props.card.image} alt='Превью фильма' />
        </button>
        <div className='movies-card__wrapper'>
          <p className='movies-card__name'>{props.card.nameRU}</p>
          <p className='movies-card__duration'>{calculateDuration(props.card.duration)}</p>
          <button className='movies-card__button' onClick={handleRemoveCard}></button>
        </div>
      </div>
    );
  }
}

export default MoviesCard;
