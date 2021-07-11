import React from 'react';
import './App.css';
import api from '../../utils/MoviesApi';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import SavedMovies from '../Movies/MoviesCardList/SavedMoviesCardList';
import Movies from '../Movies/MoviesCardList/MoviesCardList';
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
import Preloader from '../../components/Movies/Preloader/Preloader';

function App() {
  const history = useHistory();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [searchCards, setSearchCards] = React.useState([]);
  const [searchSavedCards, setSearchSavedCards] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    reloadSavedMovies();

    api.getMovies()
      .then((items) => {
        setMovies(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
  }, [savedMovies]);

  function reloadSavedMovies() {
    apiMain.getMovies()
      .then((items) => {
        setSavedMovies(items.filter((item) => {
          return item.owner === currentUser._id;
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSearchMovies(text, path) {
    if (path === '/movies') {
      searchShortMovies(text, movies, setSearchCards, path);
    } else {
      searchShortMovies(text, savedMovies, setSearchSavedCards, path);
    }
  }

  function searchShortMovies(text, movies, search, path) {
    if (text !== '') {
      if (check === true) {
        search(movies.filter((movie) => {
          return ((movie.nameRU).toLowerCase().includes(text.toLowerCase()) && movie.duration < 41);
        }));
      } else {
        search(movies.filter((movie) => {
          return (movie.nameRU).toLowerCase().includes(text.toLowerCase());
        }));
      }
    } else if (path === '/movies') {
      alert('Нужно ввести ключевое слово');
    } else {
      search(movies);
    }
  }


  function handleCheckboxChecked(checked) {
    setCheck(checked);
  }

  function removeMovie(card) {
    savedMovies.forEach((item) => {
      if (item.id === card || item.movieId === card) {
        setLoading(true);
        apiMain.removeMovie(item._id)
        .then((item) => {
          reloadSavedMovies();
          setLoading(false);
        })
        .catch((err)=>{
          console.log(err);
          setLoading(false);
        });
      } 
    });
  }

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



  function handleLogin(email, password) {
    setLoading(true);
    return auth.authorize(email, password)
      .then((value) => {
        if (value.token) {
            setLoggedIn(true);
            localStorage.setItem("token", value.token);
            history.push('/movies');
            window.location.reload();
            setLoading(false);
            return;
        }
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
      });
  }

  function handleRegister(name, email, password) {   
    setLoading(true);
    auth.register(name, email, password)
      .then((res) => {
        if (res.statusCode !== 400){
          history.push('/sign-in');
          setLoading(false);
        }
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
      });
  }

  function tokenCheck() {
    let token = localStorage.getItem("token");
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res.email) {
            setLoggedIn(true);
            setCurrentUser({...res});
            history.push('/movies');
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

  function handleEditProfile(name, email) {
    setLoading(true);
    apiMain.editProfile(name, email)
      .then((values) => {
        setCurrentUser(values);
        setLoading(false);
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
      });
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
          <ProtectedRoute path='/profile' loggedIn={loggedIn} >
            <Header path={'/movies'} />
            <Profile logeOut={signOut} edit={handleEditProfile}/>
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
            <Header path={'/movies'} isOpen={handlePopupOpenClick} />
            <SearchForm handleSearchMovies={handleSearchMovies} handleCheckboxChecked={handleCheckboxChecked} path={'/saved-movies'} />
            <SavedMovies path={'/saved-movies'} searchCards={searchSavedCards} savedMovies={savedMovies} removeMovie={removeMovie} isSaved={true} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/movies' loggedIn={loggedIn}>
            <Header path={'/movies'} isOpen={handlePopupOpenClick} />
            <SearchForm handleSearchMovies={handleSearchMovies} handleCheckboxChecked={handleCheckboxChecked} path={'/movies'} />
            <Movies path={'/movies'} searchCards={searchCards} savedMovies={savedMovies} removeMovie={removeMovie} isSaved={false} reloadSavedMovies={reloadSavedMovies} />
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
        <Preloader isOpen={loading}/>
        <Menu isOpen={isPopupOpen} onClose={handlePopupCloseClick} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
