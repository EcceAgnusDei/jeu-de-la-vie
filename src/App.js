import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import Artworks from './components/Artworks';
import SignIn from './components/SignIn';
import LogForm from './components/LogForm';
import UserSpace from './components/UserSpace';
import Footer from './components/Footer';
import { NavProvider } from './context/navContext';
import { ArtworkProvider } from './context/artworkContext';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 'Accueil',
      artwork: {},
      loggedId: 0
    };

    this.menu = ['Accueil', 'Jouer', 'Créations', 'Inscription'];
    this.handleNav = this.handleNav.bind(this);
    this.artworkLoad = this.artworkLoad.bind(this);
    this.log = this.log.bind(this);
    this.logout = this.logout.bind(this);
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
    this.setState({loggedId: 0, activePage: 'Accueil'});
    sessionStorage.removeItem('userId');
  }
  
  render() {
    if(this.state.loggedId) {
      this.menu[3] = 'Espace perso';
    } else {
      this.menu[3] = 'Inscription';
    }
    
    return (
      <div>
        <NavProvider value={{menu: this.menu, nav: this.handleNav}}>
          <Header />
        </NavProvider>
        {!this.state.loggedId && <LogForm log={this.log}/>}
          {this.state.activePage === 'Accueil' && <Home />}
          {this.state.activePage === 'Jouer' && <Play artwork={this.state.artwork} userId={this.state.loggedId}/>}
          {this.state.activePage === 'Créations' && 
            <ArtworkProvider value={this.artworkLoad}>
              <Artworks />
            </ArtworkProvider> }
          {this.state.activePage === 'Inscription' && <SignIn handleNav={this.handleNav} log={this.log}/>}
          {this.state.activePage === 'Espace perso' && <UserSpace logout={this.logout}/>}
          <Footer userId={this.state.loggedId}/>
      </div>
    );
  }
}

export default App
