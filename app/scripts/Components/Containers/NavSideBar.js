import React from 'react';
import {browserHistory , Link} from 'react-router';
import store from '../../store';

export default React.createClass({
  render() {
    return(
        <nav className = "sidebar sidebar-1">
          <ul className = "navSideBar-links-container">
            <Link to="#" className ="navSieBar-links">Recent</Link>
            <Link to="#" className ="navSieBar-links">Recent</Link>
            <Link to="#" className ="navSieBar-links">Recent</Link>
            <Link to="#" className ="navSieBar-links">Recent</Link>
            </ul>
        </nav>
    );
  },
});
