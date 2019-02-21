import axios from 'axios';
import { FETCH_CONFIG, FETCH_MOVIES, FETCH_MOVIE, IS_FETCHING } from './types';

const configURL = 'https://api.themoviedb.org/3/configuration?api_key=';
let currentPage = 1;
const discoverURL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
const movieURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = '855cd607bb53a082b2a89f36942841bb';
const sortBy = 'primary_release_date.asc';
const releaseYear = 2019;
let totalPages;

export function isFetching() {
  return function(dispatch) {
    dispatch({
      type: IS_FETCHING,
      payload: false
    });
  };
}

export function fetchConfig() {
  const req = axios.get(`${configURL}${apiKey}`);

  return function(dispatch) {
    req.then(function(response) {
      dispatch({
        type: FETCH_CONFIG,
        payload: response.data
      });

      dispatch(fetchMovies());
    });
  };
}

export function fetchMovie(id) {
  const req = axios.get(`${movieURL}${id}?api_key=${apiKey}`);

  return function(dispatch) {
    req.then(function(response) {
      dispatch({
        type: FETCH_MOVIE,
        payload: response.data
      });
    });
  };
}

export function fetchMovies() {
  // Perhaps refactor this to use axios.all()?
  function makeMultipleRequests() {
    let arr = [];

    function request() {
      //console.log(currentPage);
      return axios
        .get(
          `${discoverURL}${apiKey}&sort_by=${sortBy}&page=${currentPage}&primary_release_year=${releaseYear}`
        )
        .then(response => {
          // Get the total number of pages from the first request
          if (!totalPages) totalPages = response.data.total_pages;

          // Convert our object to an array
          const newArr = Object.keys(response.data.results).map(
            i => response.data.results[i]
          );
          // Keep adding movies to our array
          arr = [...arr, ...newArr];
          currentPage++;

          // Once our page is greater than the maximum requests we can make
          // return our array of movies, otherwise return this function to make
          // a new axios request and don't resolve the promise
          if (
            response.headers['x-ratelimit-remaining'] === '0' ||
            currentPage > totalPages
          ) {
            //console.log(arr);
            return arr;
          }
          return request();
        });
    }

    return request();
  }

  const req = makeMultipleRequests();

  return function(dispatch) {
    req.then(function(response) {
      dispatch({
        type: FETCH_MOVIES,
        payload: response
      });

      // Wait 10 seconds before sending more requests to the TMDB API. There is
      // probably a better way to do this by using the API response.
      if (currentPage < totalPages) {
        setTimeout(() => {
          dispatch(fetchMovies());
        }, 10000);
      } else {
        // No longer fetching, dispatch an action to set isFetching to false
        dispatch(isFetching());
      }
    });
  };
}
