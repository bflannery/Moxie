import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


export default React.createClass({
  render() {
    console.log(this.props);
    return (
      <li className="client-file">
        <span> Client File </span>
      </li>
    );
  },
});
