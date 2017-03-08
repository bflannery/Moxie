import React from 'react';
import HeaderNav from './HeaderNav';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

export default React.createClass({
  render() {
    return (
      <div className="header">
        <div className="header-logo-container">
          <h2 className="header-logo">
            <Link to="/home">We.Moxie </Link>
          </h2>
        </div>
        <HeaderNav />
        </div>
    );
  }
});
