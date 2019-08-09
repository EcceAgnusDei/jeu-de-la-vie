import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import Artworks from './components/Artworks';
import SignIn from './components/SignIn';
import LogForm from './components/LogForm';
import { NavProvider } from './context/navContext';
import { ArtworkProvider } from './context/artworkContext';

class App extends Component {
  constructor() {
    super();
    this.state = {
      menu: ['Accueil', 'Jouer', 'Créations', 'Inscription'],
      activePage: 'Accueil',
      artwork: {},
      loggedId: 0
    };

    this.handleNav = this.handleNav.bind(this);
    this.artworkLoad = this.artworkLoad.bind(this);
    this.log = this.log.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount()
  {
    if(sessionStorage.getItem('userId')) {
      this.setState({
        loggedId: sessionStorage.getItem('userId'),
        menu: ['Accueil', 'Jouer', 'Créations', 'Déconnexion']
      });
    }
  }

  handleNav(link)
  {
    link === 'Déconnexion' ?
    this.logout() :
    this.setState({activePage: link}, () => console.log(this.state.activePage));
  }
    
  artworkLoad(artwork)
  {
    this.setState({activePage: 'Jouer', artwork: artwork}, () => console.log(this.state.artwork));
  }

  log(login, password)
  {
    fetch(`http://localhost/GolApi/logging.php?login=${login}&password=${password}`)
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
    this.setState({loggedId: 0, menu: ['Accueil', 'Jouer', 'Créations', 'Inscription']});
    sessionStorage.removeItem('userId');
  }
  
  render() {
    return (
      <div>
        <NavProvider value={{menu: this.state.menu, nav: this.handleNav}}>
          <Header />
        </NavProvider>
        {!this.state.loggedId && <LogForm log={this.log}/>}
        {
          this.state.activePage === 'Accueil' ?
          <Home /> :
          this.state.activePage === 'Jouer' ?
          <Play artwork={this.state.artwork}/> :
          this.state.activePage === 'Créations' ?
          <ArtworkProvider value={this.artworkLoad}>
            <Artworks />
          </ArtworkProvider> :
          this.state.activePage === 'Inscription' ?
          <SignIn /> :
          <Home />
        }
      </div>
    );
  }
}

export default App
