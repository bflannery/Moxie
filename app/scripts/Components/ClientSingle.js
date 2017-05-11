import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

export default React.createClass({

  render() {
    return (
      <li className="client-container">
      <Link to ={`/clients/${this.props.client.objectId}`} className="folder-link">
      <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
        <h4 className="client-name"> {this.props.client.clientName} </h4>
        </Link>
        <button onClick={this.removeClient} type="submit" className="delete-file-button">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </button>
      </li>
    );
  },


// ----------------------------
//removeClient
    //Create local variables for client values
    //Call deleteClientFolderFromStorage
// ----------------------------


  removeClient(e) {
    e.preventDefault();
    let client = this.props.client;
      store.fileStore.deleteClientFolder(client);
  }
});
