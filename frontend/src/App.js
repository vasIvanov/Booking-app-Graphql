import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserId(null);
  }
  
  window.onbeforeunload = function () {
    if(token) {
      localStorage.setItem('token', token);
    }
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <AuthContext.Provider value={{token: token, userId: userId, logout, login}}>
      <MainNavigation/>
      <main className="main-content">
        <Switch>
          {token && <Redirect from="/" to="/events" exact/>}
          {token && <Redirect from="/auth" to="/events" exact/>}
          {!token && <Route path="/auth" component={AuthPage}/>}
          <Route path="/events" component={EventsPage}/>
          {token && <Route path="/bookings" component={BookingsPage}/>}
          {!token && <Redirect to="/auth" exact/>}
        </Switch>
      </main>
      </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
