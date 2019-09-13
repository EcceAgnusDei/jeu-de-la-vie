import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter, NavLink } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import Artworks from './components/Artworks';
import SignIn from './components/SignInForm';
import UserSpace from './components/UserSpace';
import Footer from './components/Footer';
import SideDrawer from './components/SideDrawer';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import ErrorBoundary from './components/ErrorBoundary';
import Admin from './components/Admin';
import { ArtworkProvider } from './context/artworkContext';
import apiPath from './apiPath';

import './css/style.css';

function App(props) {
  const [loggedId, setLoggedId] = useState(sessionStorage.getItem('userId') || 0);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  
  function log(login, password)
  {
    fetch(`${apiPath}logging.php`, {
      method: 'post',
      body: JSON.stringify([login, password])
    })
    .then(response => response.json())
    .then(json => {
      if(json) {
        setLoggedId(json);
        sessionStorage.setItem('userId', json);
        props.history.push('/');
      } else {
        alert('Idenfiant ou mot de passe incorrect');
      }
    })
  }

  function logout()
  {
    setLoggedId(0);
    sessionStorage.removeItem('userId');
    props.history.push('/');
  }

  function drawerClickHandler()
  {
    setSideDrawerOpen(prev => !prev);
  }

  const navbar = <Navbar loggedId={loggedId}>
    <NavLink 
      className="menu-btn"
      exact 
      activeClassName="currentPage" 
      to="/"
    >
      Accueil
    </NavLink>
    <NavLink 
      className="menu-btn" 
      activeClassName="currentPage" 
      to="/jouer"
    >
      Jouer
    </NavLink>
    <NavLink 
      className="menu-btn" 
      activeClassName="currentPage" 
      to="/creations"
    >
      Créations
    </NavLink>
    {loggedId === 0 ?
    <NavLink 
      className="menu-btn" 
      activeClassName="currentPage" 
      to="/inscription"
    >
      Inscription
    </NavLink> :
    <React.Fragment>
      <NavLink 
        className="menu-btn" 
        activeClassName="currentPage" 
        to="/espace-perso"
      >
        Espace perso
      </NavLink>
      <NavLink 
        className="menu-btn" 
        activeClassName="currentPage" 
        to="/contact"
      >
        Contact
      </NavLink>
    </React.Fragment>}
  </Navbar>;
  return (
    <React.Fragment>
      <Header 
        loggedId={loggedId} 
        log={log} 
        burgerClick={drawerClickHandler}
        navbar={navbar}
      />

      <SideDrawer 
        open={sideDrawerOpen} 
        backdropClick={drawerClickHandler}
        navbar={navbar}
      />

      <main>
        <Route exact path='/' component={Home} />
        <Route exact path='/jouer' render={(props) => 
          <Play {...props} userId={loggedId} />
        }/>
        <Route path='/jouer/:id' render={(props) => 
          <Play {...props} userId={loggedId} />
        }/>
      <ArtworkProvider>
        <Route path='/creations' component={Artworks}/>
        <Route path='/espace-perso' render={(props) => 
          <UserSpace {...props} logout={logout} userId={loggedId}/>
        }/>
      </ArtworkProvider>
        <Route path='/inscription' render={(props) =>
          <SignIn {...props} log={log}/>
        }/>
        <Route path='/admin' render={(props) => 
          <Admin {...props} userId={loggedId} />
        }/>
        <Route path='/contact' render={(props) => 
          <Contact {...props} userId={loggedId} />
        }/>
      </main>

      <Footer userId={loggedId} logout={logout}/>
    </React.Fragment>
  );
}

export default withRouter(App);