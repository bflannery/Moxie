import React from 'react';
import {browserHistory, Link} from 'react-router';
import Logout from './Logout';

export default React.createClass({
  render() {
    return (
      <div className="header">
        <div className="header-logo-container">
          <h2 className="header-logo">
            <Link to="/home">we.moxie </Link>
          </h2>
        </div>
        <Logout />
      </div>
    );
  }
});
