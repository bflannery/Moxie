import React from 'react';
import {browserHistory} from 'react-router';
import Header from '../Header';


export default React.createClass({
  render() {
    return (
      <div className="app-container">
        {this.props.children}
        <div className="footer-container">
          <span className="copyright"> &copy; 2017 bfproductions </span>
        </div>
      </div>
    );
  }
});
