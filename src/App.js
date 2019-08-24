import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import Artworks from './components/Artworks';
import SignIn from './components/SignIn';
import UserSpace from './components/UserSpace';
import Footer from './components/Footer';
import SideDrawer from './components/SideDrawer';
import { NavProvider } from './context/navContext';
import { ArtworkProvider } from './context/artworkContext';
import apiPath from './apiPath';
import './css/style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 'Accueil',
      artwork: {},
      loggedId: 0,
      sideDrawerOpen: false
    };

    this.menu = ['Accueil', 'Jouer', 'Créations', 'Inscription'];
    this.handleNav = this.handleNav.bind(this);
    this.artworkLoad = this.artworkLoad.bind(this);
    this.log = this.log.bind(this);
    this.logout = this.logout.bind(this);
    this.drawerClickHandler = this.drawerClickHandler.bind(this);
  }

  componentDidMount()
  {
    if(sessionStorage.getItem('userId')) {
      this.setState({
        loggedId: sessionStorage.getItem('userId')
      });
    }
  }

  handleNav(link)
  {
    this.setState({activePage: link, artwork: {}});
  }
    
  artworkLoad(artwork)
  {
    this.setState({activePage: 'Jouer', artwork: artwork}, () => console.log(this.state.artwork));
  }

  log(login, password)
  {
    fetch(`${apiPath}logging.php`, {
      method: 'post',
      body: JSON.stringify([login, password])
    })
      .then(response => response.json())
      .then(json => {
        if(json) {
          this.setState({
            loggedId: json,
            menu: ['Accueil', 'Jouer', 'Créations', 'Déconnexion']
          });
          sessionStorage.setItem('userId', json);
        } else {
          alert('Idenfiant ou mot de passe incorrect');
        }
      });
  }

  logout()
  {
    this.setState({loggedId: 0, activePage: 'Accueil'});
    sessionStorage.removeItem('userId');
  }

  drawerClickHandler()
  {
    this.setState((prevState) => { return {sideDrawerOpen: !prevState.sideDrawerOpen} })
  }
  
  render() {
    if(this.state.loggedId) {
      this.menu[3] = 'Espace perso';
    } else {
      this.menu[3] = 'Inscription';
    }
    
    return (
      <React.Fragment>
        <NavProvider value={{menu: this.menu, nav: this.handleNav}}>
          <Header loggedId={this.state.loggedId} log={this.log} burgerClick={this.drawerClickHandler}/>
          <SideDrawer open={this.state.sideDrawerOpen} backdropClick={this.drawerClickHandler}/>
        </NavProvider>
        <main>
          {this.state.activePage === 'Accueil' && <Home handleNav={this.handleNav}/>}
          {this.state.activePage === 'Jouer' && <Play artwork={this.state.artwork} userId={this.state.loggedId} handleNav={this.handleNav}/>}
          <ArtworkProvider value={this.artworkLoad}>
          {this.state.activePage === 'Créations' && 
            <Artworks />}
          {this.state.activePage === 'Espace perso' && <UserSpace logout={this.logout} userId={this.state.loggedId}/>}
          </ArtworkProvider>
          {this.state.activePage === 'Inscription' && <SignIn handleNav={this.handleNav} log={this.log}/>}
        </main>
          <Footer userId={this.state.loggedId} logout={this.logout}/>
      </React.Fragment>
    );
  }
}

export default App
