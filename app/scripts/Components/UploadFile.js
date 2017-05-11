import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
  render() {

      if(this.props.file.name) {
        return (
      <div>
        <i className="fa fa-file-o dropzone-file-icon" aria-hidden="true"></i>
        <span className="file-name"> {this.props.file.name} </span>
      </div>
    );
  } else {
    return (
      <div />
    );
  }
  }
});
