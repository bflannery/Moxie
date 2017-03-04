import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({
  render() {
    console.log(this.props);

    if(this.props.clientFile.clientId === this.props.clientId) {
      return (
        <div>
          <span> {this.props.clientFile.file} </span>
          </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
});
