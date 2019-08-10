import React from 'react'

const CommentContext = React.createContext();

const CommentProvider = CommentContext.Provider;
const CommentConsumer = CommentContext.Consumer;

export {CommentProvider, CommentConsumer}
export default CommentContext