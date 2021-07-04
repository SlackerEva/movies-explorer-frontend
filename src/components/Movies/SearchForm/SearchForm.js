import React from 'react';
import './SearchForm.css';
import search from "../../../images/search.svg";

function SearchForm(props) {

  const [check, setCheck] = React.useState(false);

  function getText(e) {
    e.preventDefault();
    props.handleSearchMovies(document.querySelector('.search__input').value);
  }

  function findShortMovies() {
    setCheck(!check);
    props.handleCheckboxChecked(!check);
  }

  return(
    <form className='search'>
      <div className='search__wrapper'>
        <input className='search__input' name='text' type='text' placeholder="Фильм" />
        <button className='search__button' type='submit' onClick={getText}>
          <img className='search__img' src={search} alt='Иконка поиска' />
        </button>
        <label className='checkbox'>
          <input className='checkbox__input' type='checkbox' onChange={findShortMovies} />
          <span className="checkbox__checkmark"></span>
          Короткометражки
        </label>
      </div>
    </form>
  );
}

export default SearchForm;