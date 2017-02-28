import React from 'react';
import store from '../../store';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

export default React.createClass({
  render() {
    return (
      <div className="moxie-home">
      <h1> Moxie Home </h1>
        <h2>
          <Link to="/clients"> Clients </Link>
        </h2>
        <h2>
          <Link to="/documents"> Documents </Link>
          </h2>
      </div>
    );
  }
});
