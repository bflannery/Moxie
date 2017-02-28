import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

export default React.createClass({
  render() {
    console.log(this.props);
    return (
      <li>
      <div>
        <h4 className="client-name" ref="clientName"> {this.props.client.name}</h4>
        <span className="client-description" ref="clientDescription"> {this.props.client.description}</span>
        <input onClick={this.removeClient} type="submit" value="delete" />
      </div>
      </li>
    );
  },

  removeClient(e) {
    e.preventDefault();
    let id = this.props.client.objectId;
    store.clients.get(id).deleteClient(id);
  }
});
