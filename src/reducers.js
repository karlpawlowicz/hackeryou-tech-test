import { combineReducers } from 'redux';

import {
  fetchConfig,
  fetchMovies,
  fetchMovie,
  isFetching
} from './utils/reducers';

const rootReducer = combineReducers({
  fetchConfig,
  fetchMovies,
  fetchMovie,
  isFetching
});

export default rootReducer;
