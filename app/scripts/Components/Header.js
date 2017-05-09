import React from 'react';
import {browserHistory, Link} from 'react-router';
import Logout from './Logout';
import store from '../store';


export default React.createClass({
  render() {
    return (
      <div className="header">
        <div className="header-logo-container">
         <img src="../../assets/images/wemoxie_logo.png" height="125px" width="150px"/>
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
