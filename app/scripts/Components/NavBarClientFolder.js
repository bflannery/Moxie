import React from 'react';
import {Link} from 'react-router';
import store from '../store';
import $ from 'jquery';


export default React.createClass({
  render() {
  if(this.props.clientFolder) {
    return (
        <li className = "nav-client-folder">
          <Link to={`/folders/${this.props.clientFolder.folders.objectId}`}  className="nav-client-folder-link">
            <span> {this.props.clientFolder.folders.folderName} </span>
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
