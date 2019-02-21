import {
  FETCH_CONFIG,
  FETCH_MOVIES,
  FETCH_MOVIE,
  IS_FETCHING
} from './types';

const minPopularity = 10;

export function fetchConfig(state = null, action) {
  switch (action.type) {
    case FETCH_CONFIG:
      return action.payload;
    default:
      return state;
  }
}

export function fetchMovie(state = null, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      return action.payload;
    default:
      return state;
  }
}

export function fetchMovies(state = [], action) {
  switch (action.type) {
    case FETCH_MOVIES:
      const popular = action.payload.filter(
        movie => movie.popularity >= minPopularity
      );

      return [...state, ...popular];
    default:
      return state;
  }
}

export function isFetching(state = true, action) {
  switch (action.type) {
    case IS_FETCHING:
      return action.payload;
    default:
      return state;
  }
}
