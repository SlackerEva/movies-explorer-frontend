import React from 'react';
import './App.css';
import api from '../../utils/MoviesApi';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import auth from '../../utils/auth';
import apiMain from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [searchCards, setSearchCards] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [data, setData] = React.useState({email: ''});
 

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

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      apiMain.getProfile()
      .then((values)=>{
        setCurrentUser(values);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }, [loggedIn]);

  function handleLogin({email, password}) {
    return auth.authorize(email, password)
      .then((value) => {
        if (value.token) {
            setLoggedIn(true);
            localStorage.setItem("token", value.token);
            history.push('/movies');
            console.log(value.token);
            //window.location.reload();
            return;
        }
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  function handleRegister(e) {
    e.preventDefault();
    let {name, email, password} = data;
    auth.register(name, email, password)
      .then((res) => {
        if (res.statusCode !== 400){
          //props.onClick(true);
          history.push('/sign-in');
        }
      })
      .catch((err)=>{
      //  props.onClick(false);
        console.log(err);
      });
  }

  function tokenCheck() {
    let token = localStorage.getItem("token");
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res.email) {
            setLoggedIn(true);
            setData({ email: res.email});
            setCurrentUser({...res});
            history.push('/movies')
          }
        })
        .catch((err)=>{
          localStorage.removeItem('token');
          console.log(err);
        });
    }
  }

  function signOut(){
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute path='/profile'>
            <Header path={'/movies'} />
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies'>
            <Header path={'/movies'} isOpen={handlePopupOpenClick} />
            <SearchForm />
            <SavedMovies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/movies' loggedIn={loggedIn}>
            <Header path={'/movies'} isOpen={handlePopupOpenClick} />
            <SearchForm handleSearchMovies={handleSearchMovies} handleCheckboxChecked={handleCheckboxChecked} />
            <Movies searchCards={searchCards} />
            <Footer />
          </ProtectedRoute>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
