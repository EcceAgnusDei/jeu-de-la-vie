import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

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
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  
  function drawerClickHandler()
  {
    setSideDrawerOpen(prev => !prev);
  }

  const navbar = <Navbar loggedId={props.userId}>
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
    {props.userId === 0 ?
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
        loggedId={props.userId}
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
          <Play {...props} />
        }/>
        <Route path='/jouer/:id' render={(props) => 
          <Play {...props} />
        }/>
      <ArtworkProvider>
        <Route path='/creations' component={Artworks}/>
        <Route path='/espace-perso' render={(props) => 
          <UserSpace {...props}/>
        }/>
      </ArtworkProvider>
        <Route path='/inscription' render={(props) =>
          <SignIn {...props} />
        }/>
        <Route path='/admin' render={(props) => 
          <Admin {...props} />
        }/>
        <Route path='/contact' render={(props) => 
          <Contact {...props} />
        }/>
      </main>

      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.user
  }
}

export default withRouter(connect(mapStateToProps, null)(App));