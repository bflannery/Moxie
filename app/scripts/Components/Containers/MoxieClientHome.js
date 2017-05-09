import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Client from '../../Models/clientModel';

import ClientFolders from '../ClientFolders';
import DropzoneModal from '../DropzoneModal';
import Header from '../Header';
import Sidebar from './Sidebar';
import NavSideBar from './NavSideBar';
import NewClientForm from '../NewClientForm';

export default React.createClass({
  getInitialState() {
    return {
        files: store.files.toJSON(),
        client: {
          clientFolders: []
        },
        clients: store.clients.toJSON(),
        session: store.session.toJSON()
    };
  },


  componentDidMount() {

      let client = store.client.get(this.props.params.id);
      if(!client) {
          client = new Client({objectId: this.props.params.id});
      }

      client.fetch();
      client.on('update change', this.updateState);

      store.files.fetch();
      store.files.on('update change', this.updateState);

      store.session.fetch();
      store.session.on('update change', this.updateState);

      store.clients.fetch();
      store.clients.on('uppdate change', this.updateState);
  },

  componentWillUnmount() {
    store.clients.get(this.props.params.id).off('update change', this.updateState);
    store.files.off('update change', this.updateState);
    store.session.off('update change', this.updateState);
    store.clients.off('update change', this.updateState);
  },

  updateState() {
    if(store.clients.get(this.props.params.id) !== undefined) {
    this.setState({
      client: store.clients.get(this.props.params.id).toJSON()
    });
  }
    this.setState({
      files: store.files.toJSON(),
      session: store.session.toJSON(),
      clients: store.clients.toJSON()
    })
  },



  render() {
    console.log(this.state);
    let clientContainer = <div className="main primary-container"/>

    if(this.state.client.clientName) {
     clientContainer = (
        <div className="main primary-container">
          <h2> {this.state.client.clientName} </h2>
          <ClientFolders client={this.state.client} session={this.state.session}/>
        </div>
    );

    if(this.state.session.addFolder === true) {
      clientContainer = (
       <div className="main primary-container">
         <h2> {this.state.client.clientName} </h2>
         <NewClientForm client={this.state.client}/>
         <ClientFolders client={this.state.client} session={this.state.session}/>
       </div>
     );
    }
  }


      return (
        <div className="client-file-page">
          <Header/>
          <div className="main-container">
          {clientContainer}
          <NavSideBar session={this.state.session} client={this.state.client}/>
          <Sidebar session={this.state.session} clientId={this.props.params.id}/>
        </div>
        </div>
       );
     },

   handleFile() {
     store.clients.get(this.state.client.objectId).set({addFileModal: true});
   }
});
