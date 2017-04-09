import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({

  render() {
    return (
    <div className="logout-container">
          <Link to="/landing-page" onClick={this.handleLogout} className="logout-link">Log Out</Link>
    </div>
    );
  },

  //handleLogout
    //Call logout() through Session Model

  handleLogout(e) {
    e.preventDefault();
    store.session.logout();
  }
});
