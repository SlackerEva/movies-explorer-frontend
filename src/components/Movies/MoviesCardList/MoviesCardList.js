import React from 'react';
import MovieCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {
  const [renderCards, setRenderCards] = React.useState([]);
  const [numberCards, setNumberCards] = React.useState(16);
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);

  function addCards() {
    setRenderCards(props.searchCards.filter((card, index) => index < renderCards.length + 4))
  }

  React.useEffect(() => {
    if (props.searchCards.length > numberCards) {
      setRenderCards(props.searchCards.filter((card, index) => index < numberCards));
      setNotFoundMovies(false);
    } else if (props.searchCards.length === 0) {
      setRenderCards([]);
      setNotFoundMovies(true);
    } else {
      setRenderCards(props.searchCards);
      setNotFoundMovies(false);
    }
  }, [props.searchCards, numberCards, notFoundMovies]);

  React.useEffect(() => {
    const width = window.innerWidth;
    if (width < 754) {
      setNumberCards(5);
    } else if (width < 930) {
      setNumberCards(8);
    } else if (width < 1248) {
      setNumberCards(15);
    } 
  }, [props.searchCards]);

  return(
    <section className='section-movie'>
      {notFoundMovies && props.beforeSearch ?
      
        <div className='movies-list__not-found'>
          <p className='movies-list__text'>Ничего не найдено</p>
        </div> :

        <div className='movies-list'>
          {renderCards.map((card) => {
              const check = props.savedMovies.filter((item) => {
                return item.movieId === card.id;
              }).length > 0 ? true : false;
            return <MovieCard card={card} key={card.id} check={check} removeMovie={props.removeMovie} isSaved={props.isSaved} saveMovies={props.saveMovies} />
          })}
        </div>
      }
      <div className='movies-list__continue'>
        <button className={`movies-list__button 
          ${renderCards.length === props.searchCards.length || props.searchCards.length === 0 || props.searchCards.length < numberCards ?
          'movies-list__button_hidden' : ''}`} onClick={addCards}>Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;