import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

export default React.createClass({
  render() {
    console.log(this.props);
    return (
      <li>
        <h4 className="client-name" ref="clientName" onClick={this.clientPage}> {this.props.client.name}</h4>
        <span className="client-description" ref="clientDescription"> {this.props.client.description}</span>
        <input onClick={this.removeClient} type="submit" value="delete" />
      </li>
    );
  },

  removeClient(e) {
    e.preventDefault();
    let id = this.props.client.objectId;
    store.clients.get(id).deleteClient(id);
  },

  clientPage() {
    browserHistory.push(`/clients/${this.props.client.objectId}`)
  }
});
