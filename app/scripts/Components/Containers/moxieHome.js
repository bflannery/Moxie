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
            <Link to="/clients" className="item-link">
              <i className="fa fa-users client-item-icon" aria-hidden="true"></i>
              <span> Clients</span>
            </Link>
          </li>
          <li className="moxie-item">
            <Link to="/documents" className="item-link">
              <i className="fa fa-files-o client-item-icon" aria-hidden="true"></i>
              <span>Documents</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    );
  }
});
