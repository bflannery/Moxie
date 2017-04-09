import React from 'react';
import {browserHistory , Link} from 'react-router';
import store from '../../store';

export default React.createClass({
  render() {
    console.log(this.props);
    return(
      <div className=" sidebard sidebar-1">
        <nav className = "navSideBar-container">
          <ul className = "navSideBar-links-container">
            <Link to="#" className ="navSieBar-links">Recent</Link>
            <Link to="#" className ="navSieBar-links">Recent</Link>
            <Link to="#" className ="navSieBar-links">Recent</Link>
            <Link to="#" className ="navSieBar-links">Recent</Link>
            </ul>
        </nav>
      </div>
    );
  },
});
