import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Client from '../../Models/clientModel';

import ClientFiles from '../ClientFiles';
import DropzoneModal from '../DropzoneModal';
import Header from '../Header';

export default React.createClass({

  getInitialState() {
    return {
        files: store.files.toJSON(),
        client: {
          clientFiles: []
        },
        session: store.session.toJSON(),
        dropzoneFiles: []
    };
  },

  componentDidMount() {
    let client = store.clients.get(this.props.params.id);
    if(!client) {
          client = new Client({objectId: this.props.params.id});
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
      session: store.session.toJSON()
  });
  }
},

  render() {
    let clientPage = (
      <div className= "client-body">
        <div className="title-add-container">
          <h2 className="client-page-name"> {this.state.client.name} </h2>
        </div>
        <div className="client-files-container">
          <ClientFiles client={this.state.client} session={this.state.session}/>
        </div>
      </div>
    );

    if(this.state.session.auth) {

      clientPage = (
        <div className= "client-body">
          <div className="title-add-container">
            <h2 className="client-page-name"> {this.state.client.name} </h2>
          </div>
          <div className="client-files-container">
            <ClientFiles client={this.state.client}/>
            <input onClick={this.handleFile} type="button" className="add-button" value="Add a File"/>
          </div>
        </div>
      );

        if(this.state.client.addFileModal) {
          clientPage = (
            <div className= "client-body">
              <div className="title-add-container">
                <h2 className="client-page-name"> {this.state.client.name} </h2>
              </div>
              <DropzoneModal files={this.state.files} client={this.state.client} session={this.state.session} dropzoneFiles={this.state.dropzoneFiles}/>
              <div className="client-files-container">
                <ClientFiles client={this.state.client}/>
                <input onClick={this.handleFile} type="button" className="add-button" value="Add a File"/>
              </div>
            </div>
          );
        }

    }
      return (
        <div className="client-file-page">
            <Header />
          {clientPage}
        </div>
       );
     },
   handleFile() {
     store.clients.get(this.state.client.objectId).set({addFileModal: true});
   }
});
