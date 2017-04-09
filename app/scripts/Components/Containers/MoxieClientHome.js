import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Client from '../../Models/clientModel';

import ClientFiles from '../ClientFiles';
import DropzoneModal from '../DropzoneModal';
import Header from '../Header';
import Sidebar from './Sidebar';
import NavSideBar from './NavSideBar';

export default React.createClass({

  getInitialState() {
    return {

        files: store.files.toJSON(),
        client: {
          clientFiles: []
        },
        session: store.session.toJSON(),
    };
  },

  componentDidMount() {
    let client = store.clients.get(this.props.params.id);
    if(!client) {
          client = new Client({objectId: this.props.params.id , addFileModal: false});
          store.clients.add(client);
        }
      client.fetch();
      client.on('update change', this.updateState);

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
      client: store.clients.get(this.props.params.id).toJSON(),
      files: store.files.toJSON(),
      session: store.session.toJSON(),
  });
  }
},

  render() {
    console.log(this.state);
    console.log(this.props);
    let clientContainer = (
        <div className="clients-files-container">
          <h2> {this.state.client.name} </h2>
          <ClientFiles client={this.state.client} session={this.state.session}/>
        </div>
    );

    if(this.state.session.addFileModal === true) {
          clientContainer = (
              <div className="clients-files-container">
              <div className="modal-background"/>
              <div className="modal-container">
                <DropzoneModal files={this.state.files} client={this.state.client} session={this.state.session} dropzoneFiles={this.state.dropzoneFiles}/>
              </div>
                <h2> {this.state.client.name} </h2>
                <ClientFiles client={this.state.client}/>
              </div>

          );
        }

      return (
        <div className="client-file-page">
          <Header/>
          <div className="main-container">
          {clientContainer}
          <NavSideBar session={this.state.session}/>
          <Sidebar session={this.state.session} clientId={this.props.params.id}/>
        </div>
        </div>
       );
     },

   handleFile() {
     store.clients.get(this.state.client.objectId).set({addFileModal: true});
   }
});