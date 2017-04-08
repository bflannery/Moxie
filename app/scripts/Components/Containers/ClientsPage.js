import React from 'react';
import store from '../../store';

import NewClientForm from '../NewClientForm';
import ClientsList from '../ClientsList';
import Header from '../Header';
import Sidebar from '../Sidebar';

export default React.createClass({

  getInitialState() {
    return {
      clients: store.clients.toJSON(),
      session: store.session.toJSON()
    };
  },

  componentDidMount() {
    store.clients.fetch();
    store.clients.on('update change', this.updateState);

    store.session.fetch();
    store.session.on('update change', this.updateState);
  },

  componentWillUnmount() {
    store.clients.off('update change', this.updateState);
    store.session.off('update change', this.updateState);
  },

  updateState() {
    this.setState({
      clients: store.clients.toJSON(),
      session: store.session.toJSON()
    });
  },

  render() {
    console.log(this.state);
    let newClientFormState = (
        <div className="client-list-container">
          <ClientsList clients={this.state.clients}/>
        </div>
    );

    if(this.state.session.editing) {
       newClientFormState = (
        <div className="client-list-container">
          <NewClientForm/>
          <ClientsList clients={this.state.clients}/>
        </div>
      );
    }

    return (
      <div className="moxie-home">
        <Header/>
        {newClientFormState}
        <Sidebar session={this.state.session}/>
      </div>
    );
  }
});
