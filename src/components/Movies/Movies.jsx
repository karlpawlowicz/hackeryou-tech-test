import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../utils/actions';
import MovieCard from './components/MovieCard';

import './movies.scss';

class Movies extends Component {
  renderListItem(movie) {
    let poster;
    if (movie.poster_path)
      poster = `${this.props.config.images.base_url}${
        this.props.config.images.poster_sizes[3]
      }${movie.poster_path}`;
    else poster = null;

    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.original_title}
        poster={poster}
      />
    );
  }

  renderList() {
    if (this.props.movies) {
      let movies = this.props.movies;

      return _.map(movies, this.renderListItem.bind(this));
    }
  }
  render() {
    // Refactor this to have pagination
    return (
      <div>
        <div className="container movies">
          <div className="row">{this.renderList()}</div>
        </div>
        {this.props.showLoader ? (
          <div className="container-fluid loader">
            <div className="row">
              <div className="col-sm-5" />
              <div className="col-sm-2 text-center">
                <h6>Please wait while we fetch more movies :)</h6>
                <img
                  src="https://media.giphy.com/media/20NUvxKjMv5YkMykZS/giphy.gif"
                  alt="Pusheen"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.fetchConfig,
    movies: state.fetchMovies,
    showLoader: state.isFetching
  };
}
export default connect(
  mapStateToProps,
  actions
)(Movies);
