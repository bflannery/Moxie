import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({
  getInitialState(){
    return {
      session: {auth: store.session.get('auth')}
      };
  },

  render() {
  let nav = <ul className="logged-out-nav-container">
      <li className="nav-list">
      <Link to="/landing-page" onClick={this.handleLogout}>Log Out</Link>
      </li>
  </ul>;

  if(this.state.session.auth) {
    nav = (
      <ul className="loggedIn-navContainer">
        <li className="nav-list">
            <Link to="/home"> Clients</Link>
        </li>
        <li className="nav-list">
            <Link to="/landing-page" onClick={this.handleLogout}>Log Out</Link>
        </li>
      </ul>
    );
  }
  return (
      <nav className="nav-container">
        {nav}
      </nav>
    );
  },

  handleLogout(e) {
    e.preventDefault();
    store.session.logout();
  }
});
