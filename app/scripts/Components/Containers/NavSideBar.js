import React from 'react';
import {browserHistory , Link} from 'react-router';
import store from '../../store';

export default React.createClass({
  render() {
    return(
        <nav className = "sidebar sidebar-1">
          <ul className = "navSideBar-links-container">
            <Link to="/home" onClick={this.resetState} className ="navSideBar-links">Files</Link>
            <Link to="#" className ="navSideBar-links">Recent</Link>
            <Link to="#" className ="navSideBar-links">Trash</Link>
            </ul>
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
