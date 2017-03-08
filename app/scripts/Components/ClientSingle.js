import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

export default React.createClass({
  render() {
    console.log(this.props)
    return (
      <li className="client-container">
        <h4 className="client-name" ref="clientName" onClick={this.clientPage}> {this.props.client.name}</h4>
        <button onClick={this.removeClient} type="submit" className="delete-client-button"> Delete Client</button>
      </li>
    );
  },

  removeClient(e) {
    e.preventDefault();
    let id = this.props.client.objectId;
    store.clients.get(id).deleteClient(id);

  },

  clientPage() {
    browserHistory.push(`/clients/${this.props.client.objectId}`);
  }
});
