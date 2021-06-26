import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesArr from '../../../utils/movies';

function MoviesCardList() {
  return(
    <section className='movies-list'>
      <MoviesCard img={moviesArr[0].img} name={moviesArr[0].name} duration={moviesArr[0].duration} />
      <MoviesCard img={moviesArr[1].img} name={moviesArr[1].name} duration={moviesArr[1].duration} />
      <MoviesCard img={moviesArr[2].img} name={moviesArr[2].name} duration={moviesArr[2].duration} />
    </section>
  );
}

export default MoviesCardList;