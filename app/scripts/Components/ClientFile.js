import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({
  render() {
  console.log(this.props);

  return (
    <div>
      <span> {this.props.clientFile.file} </span>
      </div>
  );

  }
});
