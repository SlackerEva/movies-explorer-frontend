import React from 'react';
import './App.css';
import { Route, Switch} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/MoviesCardList/MoviesCardList';
import Movies from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Menu from '../Header/Menu/Menu';


function App() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  function handlePopupOpenClick() {
    setIsPopupOpen(true);
  }

  function handlePopupCloseClick() {
    setIsPopupOpen(false);
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
          <SearchForm />
          <Movies />
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
