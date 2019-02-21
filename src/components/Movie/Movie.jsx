import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../utils/actions';

import './movie.scss';

class Movie extends Component {
  componentWillMount() {
    let id = this.props.match.params.id;

    this.props.fetchMovie(id);
  }

  render() {
    if (this.props.config && this.props.movie) {
      let poster;
      let genres;

      if (this.props.movie.poster_path)
        poster = `${this.props.config.images.base_url}${
          this.props.config.images.poster_sizes[3]
        }${this.props.movie.poster_path}`;
      else poster = null;

      genres = this.props.movie.genres.map((currentValue, index) => {
        if (index === 0) return currentValue.name;
        else return `, ${currentValue.name}`;
      });

      return (
        <div className="container movie">
          <div className="row">
            <div className="col-sm-4">
              {poster !== null ? (
                <img
                  src={poster}
                  alt={this.props.movie.original_title}
                  className="img-fluid"
                />
              ) : null}
            </div>
            <div className="col-sm-8">
              <h2>{this.props.movie.original_title}</h2>
              <p>
                <strong>{this.props.movie.tagline}</strong>
              </p>
              <p>
                <small>
                  {this.props.movie.runtime} minutes | {genres}
                </small>
              </p>
              <p>{this.props.movie.overview}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    config: state.fetchConfig,
    movie: state.fetchMovie
  };
}
export default connect(
  mapStateToProps,
  actions
)(Movie);
