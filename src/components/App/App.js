import React from 'react';
import './App.css';
import api from '../../utils/MoviesApi';
import { Route, Switch} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/MoviesCardList/MoviesCardList';
import Movies from '../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Menu from '../Header/Menu/Menu';


function App() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [searchCards, setSearchCards] = React.useState([]);
  const [check, setCheck] = React.useState(false);
 

  React.useEffect(() => {
    api.getMovies()
      .then((items) => {
        setCards(items.map((item) => {
          return <MoviesCard card={item} key={item.id} />
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handlePopupOpenClick() {
    setIsPopupOpen(true);
  }

  function handlePopupCloseClick() {
    setIsPopupOpen(false);
  }

  function handleSearchMovies(text) {
    if (text !== '') {
      if (check === true) {
        setSearchCards(cards.filter((card) => {
          return ((card.props.card.nameRU).toLowerCase().includes(text.toLowerCase()) && card.props.card.duration < 41);
        }));
      } else {
        setSearchCards(cards.filter((card) => {
          return (card.props.card.nameRU).toLowerCase().includes(text.toLowerCase());
        }));
      }

    } else {
      setSearchCards(cards);
    }
  }

  function handleCheckboxChecked(checked) {
    setCheck(checked);
  }


  return (
    <div className="page">
      <Switch>
        <Route path='/sign-up'>
          <Register />
        </Route>
        <Route path='/sign-in'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Header path={'/movies'} />
          <Profile />
        </Route>
        <Route path='/saved-movies'>
          <Header path={'/movies'} isOpen={handlePopupOpenClick} />
          <SearchForm />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path='/movies'>
          <Header path={'/movies'} isOpen={handlePopupOpenClick} />
          <SearchForm handleSearchMovies={handleSearchMovies} handleCheckboxChecked={handleCheckboxChecked} />
          <Movies searchCards={searchCards} />
          <Footer />
        </Route>
        <Route exact path="/">
          <Header path={'/'} />
          <Main />
          <Footer />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <Menu isOpen={isPopupOpen} onClose={handlePopupCloseClick} />
    </div>
  );
}

export default App;
