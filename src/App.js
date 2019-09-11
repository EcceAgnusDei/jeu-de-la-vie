import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter, NavLink } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Play from './components/Play';
import Artworks from './components/Artworks';
import SignIn from './components/SignInForm';
import UserSpace from './components/UserSpace';
import Footer from './components/Footer';
import SideDrawer from './components/SideDrawer';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Admin from './components/Admin';
import { ArtworkProvider } from './context/artworkContext';
import apiPath from './apiPath';

import './css/style.css';

function App(props) {
  const [loggedId, setLoggedId] = useState(sessionStorage.getItem('userId') || 0);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [redirection, setRedirection] = useState(false);
  
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
        props.history.push('/espace-perso');
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
    <NavLink 
      className="menu-btn" 
      activeClassName="currentPage" 
      to="/espace-perso"
    >
      Espace perso
    </NavLink>}
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

      <ErrorBoundary>
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
        </main>
      </ErrorBoundary>

      <Footer userId={loggedId} logout={logout}/>
    </React.Fragment>
  );
}

export default withRouter(App);

// class Appy extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       activePage: 'Accueil',
//       artwork: {},
//       loggedId: 0,
//       sideDrawerOpen: false
//     };

//     this.menu = ['Accueil', 'Jouer', 'Créations', 'Inscription'];
//     this.handleNav = this.handleNav.bind(this);
//     this.artworkLoad = this.artworkLoad.bind(this);
//     this.log = this.log.bind(this);
//     this.logout = this.logout.bind(this);
//     this.drawerClickHandler = this.drawerClickHandler.bind(this);
//   }

//   componentDidMount()
//   {
//     if(sessionStorage.getItem('userId')) {
//       this.setState({
//         loggedId: sessionStorage.getItem('userId')
//       });
//     }
//   }

//   handleNav(link)
//   {
//     this.setState({activePage: link, artwork: {}});
//   }
    
//   artworkLoad(artwork)
//   {
//     this.setState({activePage: 'Jouer', artwork: artwork});
//   }

//   log(login, password)
//   {
//     fetch(`${apiPath}logging.php`, {
//       method: 'post',
//       body: JSON.stringify([login, password])
//     })
//     .then(response => response.json())
//     .then(json => {
//       if(json) {
//         this.setState({
//           loggedId: json,
//           menu: ['Accueil', 'Jouer', 'Créations', 'Déconnexion']
//         });
//         sessionStorage.setItem('userId', json);
//       } else {
//         alert('Idenfiant ou mot de passe incorrect');
//       }
//     })
//   }

//   logout()
//   {
//     this.setState({loggedId: 0, activePage: 'Accueil'});
//     sessionStorage.removeItem('userId');
//   }

//   drawerClickHandler()
//   {
//     this.setState((prevState) => { return {sideDrawerOpen: !prevState.sideDrawerOpen} })
//   }
  
//   render() {
//     if(this.state.loggedId) {
//       this.menu[3] = 'Espace perso';
//     } else {
//       this.menu[3] = 'Inscription';
//     }
//     const navbar = <Navbar menu={this.menu} nav={this.handleNav} active={this.state.activePage}/>;
//     return (
//       <React.Fragment>
//           <Header 
//             loggedId={this.state.loggedId} 
//             log={this.log} 
//             burgerClick={this.drawerClickHandler} 
//             active={this.state.activePage}
//             navbar={navbar}
//           />
//           <SideDrawer 
//             open={this.state.sideDrawerOpen} 
//             backdropClick={this.drawerClickHandler}
//             navbar={navbar}
//           />
//           <main>
//             {this.state.activePage === 'Accueil' && 
//               <Home handleNav={this.handleNav}/>}
//             {this.state.activePage === 'Jouer' && 
//               <Play artwork={this.state.artwork} userId={this.state.loggedId} handleNav={this.handleNav}/>}
//             <ArtworkProvider value={this.artworkLoad}>
//             {this.state.activePage === 'Créations' && 
//               <Artworks />}
//             {this.state.activePage === 'Espace perso' && 
//               <UserSpace logout={this.logout} userId={this.state.loggedId}/>}
//             </ArtworkProvider>
//             {this.state.activePage === 'Inscription' && 
//               <SignIn handleNav={this.handleNav} log={this.log}/>}
//           </main>
//           <Footer userId={this.state.loggedId} logout={this.logout}/>
//       </React.Fragment>
//     );
//   }
// }