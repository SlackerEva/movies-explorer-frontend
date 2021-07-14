import React from 'react';
import './App.css';
import api from '../../utils/MoviesApi';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
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
  const [beforeSearch, setBeforeSearch] = React.useState(false);

  React.useEffect(() => {
    api.getMovies()
      .then((items) => {
        setMovies(prevState => items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSearchMovies(text, path) {
    setBeforeSearch(true);
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

  function handleClickSaveMovies(data) {
    setSavedMovies(prevState => [...prevState, data])
  }

  function handleClickRemoveMovies(cardId) {
    setSavedMovies(prevState => {
      return prevState.filter((item) => {  
        return item._id !== cardId;
      }) 
    })
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      Promise.all([apiMain.getProfile(), apiMain.getMovies()])
        .then(([usersValue, saveMovies]) => {
          setCurrentUser(usersValue);
          setSavedMovies(saveMovies.filter((item) => {
            return item.owner === usersValue._id;
          }))

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

  const PAGE_WITH_AUTH = ['/movies','/profile','/saved-movies'];
  const PAGE_WITHOUT_AUTH = ['/sign-in','/sign-up'];

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res.email) {
            setLoggedIn(true);
            setCurrentUser({...res});
            const pathToRedirect = PAGE_WITH_AUTH.includes(pathname) ? pathname : (pathname === '/' ? pathname : (PAGE_WITHOUT_AUTH.includes(pathname) ? '/' : 'notFound'));
            history.push(pathToRedirect);
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
        alert('Изменения были успешно сохранены');
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
            <Header path={'/movies'} loggedIn={loggedIn} />
            <Profile logeOut={signOut} edit={handleEditProfile}/>
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
            <Header path={'/movies'} isOpen={handlePopupOpenClick} loggedIn={loggedIn} />
            <SearchForm handleSearchMovies={handleSearchMovies} handleCheckboxChecked={handleCheckboxChecked} path={'/saved-movies'} />
            <SavedMovies path={'/saved-movies'} searchCards={searchSavedCards} savedMovies={savedMovies}  saveMovies={handleClickSaveMovies} removeMovie={handleClickRemoveMovies} isSaved={true} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/movies' loggedIn={loggedIn}>
            <Header path={'/movies'} isOpen={handlePopupOpenClick} loggedIn={loggedIn} />
            <SearchForm handleSearchMovies={handleSearchMovies} handleCheckboxChecked={handleCheckboxChecked} path={'/movies'} />
            <Movies path={'/movies'} searchCards={searchCards} savedMovies={savedMovies} saveMovies={handleClickSaveMovies} removeMovie={handleClickRemoveMovies} isSaved={false} beforeSearch={beforeSearch} />
            <Footer />
          </ProtectedRoute>
          <Route exact path="/">
            <Header path={'/'} loggedIn={loggedIn} />
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
