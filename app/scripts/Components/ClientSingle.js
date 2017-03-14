import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

export default React.createClass({
  render() {
    return (
      <li className="client-container">
      <Link to ={`/clients/${this.props.client.objectId}`} onClick={this.clientPage}>
        <h4 className="client-name"> {this.props.client.name} </h4>
        </Link>
        <button onClick={this.removeClient} type="submit" className="delete-client-button"> Delete Client</button>
      </li>
    );
  },

  removeClient(e) {
    e.preventDefault();
    let id = this.props.client.objectId;
    store.clients.get(id).deleteClient(id);

  }
});
