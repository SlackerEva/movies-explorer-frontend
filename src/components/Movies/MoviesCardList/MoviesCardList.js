import React from 'react';
import './MoviesCardList.css';
//import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const [renderCards, setRenderCards] = React.useState([]);
  const [numberCards, setNumberCards] = React.useState(16);

  function addCards() {
    setRenderCards(props.searchCards.filter((card, index) => index < renderCards.length + 4))
  }

  React.useEffect(() => {
    if (props.searchCards.length > numberCards) {
      setRenderCards(props.searchCards.filter((card, index) => index < numberCards));
    } else {
      setRenderCards(props.searchCards);
    }
  }, [props.searchCards, numberCards]);

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
      <div className='movies-list'>
        {renderCards}
      </div>
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
