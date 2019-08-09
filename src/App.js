import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import Artworks from './components/Artworks';
import { NavProvider } from './context/navContext';
import { ArtworkProvider } from './context/artworkContext';

class App extends Component {
  constructor() {
    super();
    this.menu = ['Accueil', 'Jouer', 'Créations'];
    this.state = {
      activePage: 'Accueil',
      artwork: {}
    };

    this.handleNav = this.handleNav.bind(this);
    this.artworkLoad = this.artworkLoad.bind(this);
  }

  handleNav(link)
  {
    this.setState({activePage: link}, () => console.log(this.state.activePage));
  }

  artworkLoad(artwork)
  {
    this.setState({activePage: 'Jouer', artwork: artwork}, () => console.log(this.state.artwork));
  }
  
  render() {
    return (
      <div>
        <NavProvider value={{menu: this.menu, nav: this.handleNav}}>
          <Header />
        </NavProvider>
        {
          this.state.activePage === 'Accueil' ?
          <Home /> :
          this.state.activePage === 'Jouer' ?
          <Play artwork={this.state.artwork}/> :
          this.state.activePage === 'Créations' ?
          <ArtworkProvider value={this.artworkLoad}>
            <Artworks />
          </ArtworkProvider> : ''
        }
      </div>
    );
  }
}

export default App
