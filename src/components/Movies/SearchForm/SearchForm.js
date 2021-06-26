import './SearchForm.css';
import search from "../../../images/search.svg";

function SearchForm() {
  return(
    <form className='search'>
      <div className='search__wrapper'>
        <input className='search__input' type='text' placeholder="Фильм" />
        <button className='search__button' type='submit'>
          <img className='search__img' src={search} alt='Иконка поиска' />
        </button>
        <label className='checkbox'>
          <input className='checkbox__input' type='checkbox' />
          <span className="checkbox__checkmark"></span>
          Короткометражки
        </label>
      </div>
    </form>
  );
}

export default SearchForm;