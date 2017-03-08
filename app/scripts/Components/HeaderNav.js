import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({
  getInitialState(){
    return {auth: store.session.get('auth')};
  },

  componentWillMount() {
    store.session.on('change', () => {
      this.setState({auth: store.session.get('auth')});
    });
  },
  render() {

  let nav = <ul className="logged-out-nav-container"></ul>;

  if(this.state.auth) {
    nav = (
      <ul className="loggedIn-navContainer">
        <li className="nav-list">
            <Link to="/clients"> Clients</Link>
        </li>
        <li className="nav-list">
            <Link to="/documents"> Documents</Link>
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
