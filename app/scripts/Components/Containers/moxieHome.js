import React from 'react';
import store from '../../store';

import NewClientForm from '../NewClientForm';
import ClientsList from '../ClientsList';
import Header from '../Header';
import Sidebar from './Sidebar';
import NavSideBar from './NavSideBar';
import DropzoneModal from '../DropzoneModal';

export default React.createClass({

  getInitialState() {

    return {

      session: store.session.toJSON(),
      files: store.files.toJSON(),
      clients: store.clients.toJSON(),
      folders: store.folders.toJSON(),
    };
  },

  componentDidMount() {
    store.session.fetch();
    store.session.on('update change', this.updateState);

    store.files.fetch();
    store.files.on('update change', this.updateState);

    store.clients.fetch();
    store.clients.on('update change', this.updateState);

    store.folders.fetch();
    store.folder.on('update change', this.updateState);

  },

  componentWillUnmount() {
    store.session.off('update change', this.updateState);
    store.files.off('update change', this.updateState);
    store.clients.off('update change', this.updateState);
    store.folders.off('update change', this.updateState);
  },

  updateState() {
    this.setState({
      session: store.session.toJSON(),
      files: store.files.toJSON(),
      clients: store.clients.toJSON(),
      folders: store.session.toJSON(),
    });
  },

  render() {
    let newClientFormState = (
        <div className="main primary-container">
        <h2> moxie </h2>
          <ClientsList clients={this.state.clients} files={this.state.files}/>
        </div>
    );

    if(this.state.session.addFolder === true) {
       newClientFormState = (
        <div className="main primary-container">
          <h2> moxie </h2>
          <NewClientForm/>
          <ClientsList clients={this.state.clients} files={this.state.files}/>
        </div>
      );
    }

    return (

      <div className="moxie-home">
        <Header/>
        <div className="main-container">
        {newClientFormState}
        <NavSideBar session={this.state.session} />
        <Sidebar session={this.state.session}/>
        </div>
      </div>
    );
  },

  toggleSort(e) {
    e.preventDefault();
    store.clients.toggleClientsSort();
  }
});
