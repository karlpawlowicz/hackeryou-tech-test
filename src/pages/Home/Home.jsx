import React, { Component } from 'react';

import Movies from '../../components/Movies';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container text-center mt-5">
          <div className="row">
            <div className="col-sm-12">
              <h1>2019 Movies</h1>
            </div>
          </div>
        </div>
        <Movies />
      </div>
    );
  }
}

export default Home;
