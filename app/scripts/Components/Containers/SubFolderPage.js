import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Folder from '../../Models/folderModel';

import ClientItems from '../ClientItems';
import SubFolderFiles from '../SubFolderFiles';
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
      clients: store.clients.toJSON(),
      folder: {
            files: []
      },
      session: store.session.toJSON(),
      client: {}
    };
  },


componentDidMount() {
  store.folders.fetch();
  store.folders.on('update change', this.updateState);

  store.clients.fetch();
  store.clients.on('update change', this.updateState);

  store.files.fetch();
  store.files.on('update change', this.updateState);

  store.session.fetch();
  store.session.on('update change', this.updateState);

  let folder = store.folders.get(this.props.params.id);
  if(!folder) {
    folder = new Folder({objectId: this.props.params.id});
  }

  folder.fetch();
  folder.on('update change', this.updateState);

},

componentWillUnmount() {
  store.files.off('update change', this.updateState);
  store.session.off('update change', this.updateState);
  store.clients.off('update change', this.updateState);
  store.folders.off('update change', this.updateState);
},

updateState() {

if(store.clients.get(this.state.folder.clientId) !== undefined){
  this.setState({
    client: store.clients.get(this.state.folder.clientId)
  });
}

if(store.folders.get(this.props.params.id) !== undefined) {
  this.setState({
    folder: store.folders.get(this.props.params.id).toJSON(),
    });
  }
  this.setState({

    files: store.files.toJSON(),
    clients: store.clients.toJSON(),
    session: store.session.toJSON(),
    folders: store.folders.toJSON()
  })
},
  render() {
    let subFolderContainer;

    if(this.state.folder === undefined) {
      subFolderContainer = <div/>
    } else {

      subFolderContainer = (
        <div className="main primary-container">
          <h2> {this.state.folder.folderName} </h2>
          <SubFolderFiles files={this.state.files} folder={this.state.folder} session={this.state.session}/>
        </div>
      );


      if(this.state.session.addFileModal === true) {
        subFolderContainer = (
          <div className="main primary-container">
            <div className="modal-background"/>
            <div className="modal-container">
              <DropzoneModal files={this.state.files} folder={this.state.folder} session={this.state.session} dropzoneFiles={this.state.dropzoneFiles}/>
            </div>
            <h2> {this.state.folder.folderName} </h2>
            <SubFolderFiles folder={this.state.folder} session={this.state.session}/>
          </div>

            );
          }
        }

    return (
      <div className="subfolder-container">
        <Header/>
        <div className="main-container">
        {subFolderContainer}
        <NavSideBar session={this.state.session} client={this.state.client}/>
        <Sidebar session={this.state.session} folder={this.state.folder}/>
        </div>
      </div>
    );
  }
});
