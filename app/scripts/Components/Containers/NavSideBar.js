import React from 'react';
import {browserHistory , Link} from 'react-router';
import store from '../../store';

export default React.createClass({
  render() {
    let navBar;
    if(this.props.session.auth === false) {
      navBar = <div />;
    } else {
        navBar = (
          <ul className = "navSideBar-links-container">
            <Link to="/home" onClick={this.resetState} className ="navSideBar-links">Clients</Link>
            <Link to="/files" onClick={this.resetState} className="navSideBar-links">Files</Link>
            <Link to="/recent" onClick={this.resetState} className ="navSideBar-links">Recent</Link>
            <Link to="/trash" onClick={this.resetState} className ="navSideBar-links">Trash</Link>
            </ul>
        );
    }
    return(
        <nav className = "sidebar sidebar-1">
        {navBar}
        </nav>
    );

  },

  resetState() {
    store.client.set({addFolder: false});
    store.client.set({addFileModal: false});
    store.session.set({addFolder: false});
    store.session.set({addFileModal: false});
  }
});
