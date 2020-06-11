import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
import AuthContext from '../../context/auth-context'

const MainNavigation = () => {
  const {token, userId, logout} = useContext(AuthContext)
  
  return (
      <header className="main-navigation">
          <div className="main-navigation__logo">
              <h1>Event Booker</h1>
          </div>
          <nav className="main-navigation__items">
              <ul>
                  <li><NavLink to="/events">Events</NavLink></li>
                  {token && <li><NavLink to="/bookings">Bookings</NavLink></li>}
                  {!token && <li><NavLink to="/auth">Authentication</NavLink></li>}
                  {token && <li><button onClick={logout}>Logout</button></li>}
              </ul>
          </nav>
      </header>
  )  
}

export default MainNavigation;