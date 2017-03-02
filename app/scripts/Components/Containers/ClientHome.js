import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Client from '../../Models/clientModel';

import ClientFiles from '../ClientFiles';

export default React.createClass({

  getInitialState() {
    return {
        client: {
          clientFiles: []
        },
        session: store.session.toJSON()
    };
  },

  componentDidMount() {
    let client = store.clients.get(this.props.params.id);
      if(!client) {
        client = new Client({objectId: this.props.params.id});
        store.clients.add(client);
      }
      store.client.fetch();
      store.client.on('update change', this.updateState);

      store.files.fetch();
      store.files.on('update change', this.updateState);

      store.session.fetch();
      store.session.on('update change', this.updateState);
  },

  componentWillUnmount() {
    store.clients.get(this.props.params.id).off('update change', this.updateState);
    store.files.off('update change', this.updateState);
    store.session.off('update change', this.updateState);
  },

  updateState() {
    if(store.clients.get(this.props.params.id) !== undefined) {
    this.setState({
      client: store.clients.get(this.props.params.id).toJSON()
    });
  }
  this.setState({
    files: store.files.toJSON(),
    session: store.session.toJSON()
  });
},

  render() {
       return (
         <div className="main-container">
            <input onClick={this.handleFile} type="button" value="Add a File"/>
          <ClientFiles clientFiles={this.state.files} client={this.state.client}/>
        </div>
       );
     },
   handleFile() {
     browserHistory.push('/clients/files/' + this.props.params.id);
   }
});
