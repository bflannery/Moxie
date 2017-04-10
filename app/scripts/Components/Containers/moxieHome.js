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
      files: store.files.toJSON(),
      clients: store.clients.toJSON(),
      session: store.session.toJSON()
    };
  },

  componentDidMount() {
    store.files.fetch();
    store.files.on('update change', this.updateState);

    store.clients.fetch();
    store.clients.on('update change', this.updateState);

    store.session.fetch();
    store.session.on('update change', this.updateState);
  },

  componentWillUnmount() {
    store.files.off('update change', this.updateState);
    store.clients.off('update change', this.updateState);
    store.session.off('update change', this.updateState);

  },

  updateState() {
    this.setState({
      files: store.files.toJSON(),
      clients: store.clients.toJSON(),
      session: store.session.toJSON(),

    });
  },

  render() {
    let newClientFormState = (
        <div className="clients-files-container">
          <ClientsList clients={this.state.clients} files={this.state.files}/>
        </div>
    );

    if(this.state.session.addFolder === true) {
       newClientFormState = (
        <div className="clients-files-container">
          <NewClientForm/>
          <ClientsList clients={this.state.clients} files={this.state.files}/>
        </div>
      );
    }
    if(this.state.session.addFileModal === true) {
      newClientFormState = (
        <div className="clients-files-container">
          <DropzoneModal files={this.state.files} client={this.state.client} session={this.state.session}/>
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
  }
});
