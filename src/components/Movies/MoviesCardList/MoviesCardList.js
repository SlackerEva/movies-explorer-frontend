import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesArr from '../../../utils/movies';

function MoviesCardList() {
  return(
    <section className='section-movie'>
      <div className='movies-list'>
        <MoviesCard img={moviesArr[0].img} name={moviesArr[0].name} duration={moviesArr[0].duration} />
        <MoviesCard img={moviesArr[1].img} name={moviesArr[1].name} duration={moviesArr[1].duration} />
        <MoviesCard img={moviesArr[2].img} name={moviesArr[2].name} duration={moviesArr[2].duration} />
        <MoviesCard img={moviesArr[3].img} name={moviesArr[3].name} duration={moviesArr[3].duration} />
        <MoviesCard img={moviesArr[4].img} name={moviesArr[4].name} duration={moviesArr[4].duration} />
        <MoviesCard img={moviesArr[5].img} name={moviesArr[5].name} duration={moviesArr[5].duration} />
        <MoviesCard img={moviesArr[6].img} name={moviesArr[6].name} duration={moviesArr[6].duration} />
        <MoviesCard img={moviesArr[7].img} name={moviesArr[7].name} duration={moviesArr[7].duration} />
        <MoviesCard img={moviesArr[8].img} name={moviesArr[8].name} duration={moviesArr[8].duration} />
        <MoviesCard img={moviesArr[9].img} name={moviesArr[9].name} duration={moviesArr[9].duration} />
        <MoviesCard img={moviesArr[10].img} name={moviesArr[10].name} duration={moviesArr[10].duration} />
        <MoviesCard img={moviesArr[11].img} name={moviesArr[11].name} duration={moviesArr[11].duration} />
        <MoviesCard img={moviesArr[12].img} name={moviesArr[12].name} duration={moviesArr[12].duration} />
        <MoviesCard img={moviesArr[13].img} name={moviesArr[13].name} duration={moviesArr[13].duration} />
        <MoviesCard img={moviesArr[14].img} name={moviesArr[14].name} duration={moviesArr[14].duration} />
        <MoviesCard img={moviesArr[15].img} name={moviesArr[15].name} duration={moviesArr[15].duration} />
      </div>
      <div className='movies-list__continue'>
        <button className='movies-list__button'>Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;