import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

import store from '../../store';
import Folder from '../../Models/folderModel';

import ClientItems from '../ClientItems';
import ClientFiles from '../ClientFiles';
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
      folder: {    },
      session: store.session.toJSON(),
    };
  },

componentDidMount() {

  let folder = store.folders.get(this.props.params.id);
  console.log(folder)
  folder.fetch();

  store.clients.fetch();
  store.clients.on('update change', this.updateState);

  store.files.fetch();
  store.files.on('update change', this.updateState);

  store.session.fetch();
  store.session.on('update change', this.updateState);


},

componentWillUnmount() {
  store.folders.get(this.props.params.id).off('update change', this.updateState);
  store.files.off('update change', this.updateState);
  store.session.off('update change', this.updateState);
  store.clients.off('update change', this.updateState);
},

updateState() {
  this.setState({
    folder: store.folders.get(this.props.params.id).toJSON(),
    files: store.files.toJSON(),
    clients: store.clients.toJSON(),
    session: store.session.toJSON(),
  });
},

  render() {
    console.log(this.props);
    console.log(this.state);

    let subFolderContainer;

    if(this.state.folder === undefined) {
      subFolderContainer = <div/>
    } else {
      subFolderContainer = (
        <div className="main primary-container">
          <h2> {this.state.folder.folderName} </h2>
        </div>
      )
    }
    return (
      <div className="subfolder-container">
        <Header/>
        <div className="main-container">
        {subFolderContainer}
        <NavSideBar session={this.state.session} />
        <Sidebar session={this.state.session} folder={this.state.folder}/>
        </div>
      </div>
    );
  }
});
