import React from 'react'

const NavContext = React.createContext();

const NavProvider = NavContext.Provider;
const NavConsumer = NavContext.Consumer;

export {NavProvider, NavConsumer}
export default NavContext