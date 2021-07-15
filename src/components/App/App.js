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
  const [searchCards, setSearchCards] = React.useState([]);
  const [searchSavedCards, setSearchSavedCards] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [beforeSearch, setBeforeSearch] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [searchSavedText, setSearchSavedText] = React.useState('');

  React.useEffect(() => { 
    const searchedMovies = localStorage.getItem('searchedMovies');
    const searchedSavedMovies = localStorage.getItem('searchedSavedMovies');
    const movies = localStorage.getItem('movies');
    const savedMovies = localStorage.getItem('savedMovies');
    const searchText = localStorage.getItem('searchText');
    const searchSavedText = localStorage.getItem('searchSavedText');

    if (searchedMovies) {
      setSearchCards(JSON.parse(searchedMovies));
    }
    if (searchedSavedMovies) {
      setSearchSavedCards(JSON.parse(searchedSavedMovies));
    }
    if (savedMovies) {
      setSavedMovies(JSON.parse(savedMovies));
    }
    if (searchText) {
      setSearchText(searchText);
    }
    if (searchSavedText) {
      setSearchSavedText(searchSavedText);
    }
    if (!movies) {
      api.getMovies()
        .then((items) => {
          localStorage.setItem('movies', JSON.stringify(items));      
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleSearchMovies(text, path) {
    setBeforeSearch(true);
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (path === '/movies') {
      searchShortMovies(text, setSearchCards, movies, path, 'searchedMovies');
      localStorage.setItem('searchText', text);
      setSearchText(text);
    } else {
      searchShortMovies(text, setSearchSavedCards, savedMovies, path, 'searchedSavedMovies');
      localStorage.setItem('searchSavedText', text);
      setSearchSavedText(text);
    }
  }

  function searchShortMovies(text, search, movies, path, storage) {
    if (text !== '') {
      if (check === true) {
        const findedMovies = movies.filter((movie) => {
          return ((movie.nameRU).toLowerCase().includes(text.toLowerCase()) && movie.duration < 41);
        });
        localStorage.setItem(storage, JSON.stringify(findedMovies));
        search(JSON.parse(localStorage.getItem(storage)));
      } else {
        const findedMovies = movies.filter((movie) => {
          return (movie.nameRU).toLowerCase().includes(text.toLowerCase());
        });
        localStorage.setItem(storage, JSON.stringify(findedMovies));
        search(JSON.parse(localStorage.getItem(storage)));
      }
    } else if (path === '/movies') {
      alert('Нужно ввести ключевое слово');
    } else {
      localStorage.setItem(storage, JSON.stringify(movies));
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
          const accMovies = saveMovies.filter((item) => {
            return item.owner === usersValue._id;
          })
          setSavedMovies(accMovies);
          localStorage.setItem('savedMovies', JSON.stringify(accMovies));
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
    localStorage.removeItem('movies');
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('searchSavedText');
    localStorage.removeItem('searchText');
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
            <SearchForm handleSearchMovies={handleSearchMovies} handleCheckboxChecked={handleCheckboxChecked} path={'/saved-movies'} defautlValue={searchSavedText} />
            <SavedMovies path={'/saved-movies'} searchCards={searchSavedCards} savedMovies={savedMovies}  saveMovies={handleClickSaveMovies} removeMovie={handleClickRemoveMovies} isSaved={true} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/movies' loggedIn={loggedIn}>
            <Header path={'/movies'} isOpen={handlePopupOpenClick} loggedIn={loggedIn} />
            <SearchForm handleSearchMovies={handleSearchMovies} handleCheckboxChecked={handleCheckboxChecked} path={'/movies'} defautlValue={searchText} />
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
