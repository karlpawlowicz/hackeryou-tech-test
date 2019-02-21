import React from 'react';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export default props => {
  return (
    <div className="col-sm-4 d-flex movie-card">
      <Link to={`/movie/${props.id}`}>
        <div className="card shadow-lg">
          <div className="img-container">
            {props.poster !== null ? (
              <img src={props.poster} alt={props.title} className="img-fluid" />
            ) : null}
          </div>
          <h3>{props.title}</h3>
        </div>
      </Link>
    </div>
  );
};
