import React from 'react';
import {browserHistory, Link} from 'react-router';
import Logout from './Logout';
import store from '../store';


export default React.createClass({
  render() {
    return (
      <div className="header">
        <div className="header-logo-container">
          <h2 className="header-logo">
            <Link to="/home" onClick={this.resetState}>we.moxie </Link>
          </h2>
        </div>
        <Logout />
      </div>
    );
  },

  resetState() {
    store.client.set({addFolder: false});
    store.client.set({addFileModal: false});
    store.session.set({addFolder: false});
    store.session.set({addFileModal: false});
  }
});
