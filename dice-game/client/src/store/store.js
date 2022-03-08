import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';

import logger from 'redux-logger';
import { createMiddleware } from 'redux-api-middleware';

import rootReducer from '../reducers/rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk)
//   )

// const combinedReducers = combineReducers({
//   entities: entities,
//   posts: postReducer,
// });

const store = createStore(rootReducer, 
  composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger)),
  );

  export default store;