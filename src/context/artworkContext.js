import React from 'react'

const ArtworkContext = React.createContext();

const ArtworkProvider = ArtworkContext.Provider;
const ArtworkConsumer = ArtworkContext.Consumer;

export {ArtworkProvider, ArtworkConsumer}
export default ArtworkContext