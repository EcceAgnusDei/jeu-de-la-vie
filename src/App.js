import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import { NavProvider } from './context/navContext';

class App extends Component {
  constructor() {
    super();
    this.menu = ['Accueil', 'Jouer', 'Créations'];
    this.state = {
      activePage: 'Accueil'
    };

    this.handleNav = this.handleNav.bind(this);
  }

  handleNav(link)
  {
    this.setState({activePage: link}, () => console.log(this.state.activePage));
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
          <Play /> : ''
        }
      </div>
    );
  }
}

export default App
