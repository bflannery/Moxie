import React from 'react';
import store from '../../store';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import Header from '../Header';

export default React.createClass({
  render() {
    return (
      <div className="moxie-homepage">
      <Header/>
      <div className="moxie-home-container">
        <ul className="moxie-items-list">
          <li className="moxie-item">
            <i className="fa fa-users client-item-icon" aria-hidden="true"></i>
            <Link to="/clients"> Clients </Link>
          </li>
          <li className="moxie-item">
            <i className="fa fa-files-o client-item-icon" aria-hidden="true"></i>
            <Link to="/documents"> Documents </Link>
          </li>
        </ul>
      </div>
    </div>
    );
  }
});
