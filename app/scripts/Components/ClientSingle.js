import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

export default React.createClass({
  render() {
    console.log(this.props)
    return (
      <li className="client-container">
      <Link to ={`/clients/${this.props.client.objectId}`} onClick={this.clientPage}>
      <i className="fa fa-folder-o folder-icon" aria-hidden="true"></i>
        <h4 className="client-name"> {this.props.client.name} </h4>
        </Link>
        <button onClick={this.removeClient} type="submit" className="delete-client-button"> Delete Client</button>
      </li>
    );
  },

  removeClient(e) {
    e.preventDefault();
    let clientName = this.props.client.name;
    let clientId = this.props.client.objectId;

    store.clients.get(clientId).deleteClientFromDataTable(clientName, clientId);

  }
});
