import React from 'react';
import {Link} from 'react-router';
import store from '../store';


export default React.createClass({
  render() {
    if(this.props.clientFile.clientId === this.props.client.objectId) {
      return (
        <li className="client-file">
        <i className="fa fa-file-o file-icon" aria-hidden="true"></i>
          <Link to={`/preview/${this.props.clientFile.objectId}`} className="file-link">
            <span> {this.props.clientFile.file} </span>
          </Link>
          </li>
      );
    } else {
      return (
        <div />
      );
    }
  }
});
