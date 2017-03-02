import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({
  render() {
  return (
    <div>
      <span> {this.props.clientFile.file} </span>
      </div>
  );

  }
});
