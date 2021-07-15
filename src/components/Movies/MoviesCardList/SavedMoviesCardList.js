import './MoviesCardList.css';
import React from 'react';
import MovieCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const [renderCards, setRenderCards] = React.useState(props.savedMovies);

  React.useEffect(() => {
    if (props.searchCards.length !== 0) {
      setRenderCards(props.searchCards);
    } else {
      setRenderCards(props.savedMovies);
    }
  }, [props.searchCards, props.savedMovies]);

  return(
    <section className='movies-list'>
      {renderCards.map((card) => {
        return <MovieCard card={card} key={card._id} removeMovie={props.removeMovie} isSaved={props.isSaved}/>
      })}
    </section>
  );
}

export default MoviesCardList;